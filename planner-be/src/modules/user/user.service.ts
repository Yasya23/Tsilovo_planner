import {
  ForgetPasswordDto,
  PasswordDto,
  UpdateAvatarDto,
  UpdateEmailDto,
  UpdateNameDto,
} from './dto';
import { ResendService } from '@/modules/resend/resend.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
import { UserModel } from '@/user/model/user.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly configService: ConfigService,
    private readonly resendService: ResendService,
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

  async updatePassword(userId: string, userDto: PasswordDto, locale) {
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
  }

  async updateEmail(userId: string, userDto: UpdateEmailDto, locale: string) {
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
    user.email = userDto.email;
    await user.save();
  }

  async updateAvatar(userId: string, { image }: UpdateAvatarDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.image = image;
    return await user.save();
  }

  async deleteProfile(id: string) {
    //Todo list on email
  }

  async forgotPassword({ email }: ForgetPasswordDto, locale: LocaleType) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    // if (user.provider === 'google')
    //   throw new BadRequestException(
    //     'User with google account cannot reset password',
    //   );

    const id = user._id.toString();
    const token = this.generateActionToken(id, 'reset');

    await this.resendService.sendEmail({
      to: email,
      subject: 'reset password',
      token: token,
      locale: locale,
      name: user.name,
    });
  }

  async resetPasswordWithToken(
    token: string,
    newPassword: string,
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
    user.password = await hash(newPassword, salt);
    await user.save();
  }

  async deleteAccountWithToken(token: string, locale: LocaleType) {
    const payload = verify(token, this.configService.get('JWT_SECRET')) as {
      id: string;
      type: string;
    };
    if (payload.type !== 'delete')
      throw new BadRequestException('Invalid token');
    const date = new Date();
    await this.userModel.findByIdAndUpdate({ isAcive: false, deletedAt: date });
  }

  generateActionToken(userId: string, action: 'reset' | 'delete' | 'email') {
    const payload = { id: userId, type: action };
    const secret = this.configService.get('JWT_SECRET');
    return sign(payload, secret, { expiresIn: '15m' });
  }
}
