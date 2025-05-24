import {
  ForgetPasswordDto,
  PasswordDto,
  ResetPasswordDto,
  UpdateAvatarDto,
  UpdateEmailDto,
  UpdateNameDto,
} from './dto';
import { MailService } from '@/modules/mail/mail.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
import { UserModel } from '@/user/model/user.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async getAllUsers(): Promise<any[]> {
    const users = await this.userModel.find().exec();

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async getByID(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: Partial<UserModel>) {
    const user = new this.userModel(userData);
    return user.save();
  }
  async updateName(userId: string, userDto: UpdateNameDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.name = userDto.name;
    await user.save();
  }

  async updatePassword(
    userId: string,
    userDto: PasswordDto,
    locale: LocaleType,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await compare(userDto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }
    const saltHash = Number(this.configService.get('PASSWORD_SALT'));
    const salt = await genSalt(saltHash);
    user.password = await hash(userDto.newPassword, salt);
    await user.save();

    this.mailService.sendEmail({
      to: user.email,
      subject: 'password has changed',
      locale: locale,
      name: user.name,
    });
  }

  async updateEmail(
    userId: string,
    userDto: UpdateEmailDto,
    locale: LocaleType,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isEmailUnique = await this.userModel.findOne({
      email: userDto.email,
    });
    if (isEmailUnique) {
      throw new NotFoundException('This email address is already used');
    }

    const isPasswordValid = await compare(userDto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }
    const oldEmail = user.email;
    user.email = userDto.email;
    user.oldEmail = oldEmail;
    await user.save();

    this.mailService.sendEmail({
      to: oldEmail,
      subject: 'email has changed',
      locale: locale,
      name: user.name,
    });
  }

  async updateAvatar(userId: string, { image }: UpdateAvatarDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.image = image;
    return await user.save();
  }

  async deleteProfile(id: string, locale: LocaleType) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const token = this.generateActionToken(id, 'delete');
    this.mailService.sendEmail({
      to: user.email,
      subject: 'account deletion confirmation',
      token: token,
      locale: locale,
      name: user.name,
    });
  }

  async forgotPassword({ email }: ForgetPasswordDto, locale: LocaleType) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    if (user.provider === 'google')
      throw new BadRequestException(
        'User with google account cannot reset password',
      );

    const id = user._id.toString();
    const token = this.generateActionToken(id, 'reset');

    await this.mailService.sendEmail({
      to: email,
      subject: 'reset password',
      token: token,
      locale: locale,
      name: user.name,
    });
  }

  async resetPasswordWithToken(
    token: string,
    { password }: ResetPasswordDto,
    locale: LocaleType,
  ) {
    const secret = this.configService.get('JWT_SECRET');
    let payload: any;

    try {
      payload = verify(token, secret);
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }

    if (payload.type !== 'reset') {
      throw new BadRequestException('Invalid token type');
    }

    const user = await this.userModel.findById(payload.id);
    if (!user) throw new NotFoundException('User not found');

    const salt = await genSalt(Number(this.configService.get('PASSWORD_SALT')));
    user.password = await hash(password, salt);
    await user.save();

    this.mailService.sendEmail({
      to: user.email,
      subject: 'password has changed',
      locale: locale,
      name: user.name,
    });
  }

  async deleteAccountWithToken(token: string, locale: LocaleType) {
    const payload = verify(token, this.configService.get('JWT_SECRET')) as {
      id: string;
      type: string;
    };
    if (payload.type !== 'delete')
      throw new BadRequestException('Invalid token');

    const user = await this.userModel.findById(payload.id);
    if (!user) throw new NotFoundException('User not found');
    await this.userModel.findByIdAndUpdate(user._id, {
      isActive: false,
      deletedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    this.mailService.sendEmail({
      to: user.email,
      subject: 'account was deleted',
      locale: locale,
      name: user.name,
    });
  }

  generateActionToken(userId: string, action: 'reset' | 'delete' | 'email') {
    const payload = { id: userId, type: action };
    const secret = this.configService.get('JWT_SECRET');
    return sign(payload, secret, { expiresIn: '15m' });
  }

  @Cron(CronExpression.EVERY_WEEK)
  async handleDeleteCron() {
    this.logger.log('Running weekly user deletion cron job');

    const result = await this.userModel.deleteMany({
      isActive: false,
      deletedAt: { $lte: new Date() },
    });

    this.logger.log(`Deleted ${result.deletedCount} accounts`);
  }
}
