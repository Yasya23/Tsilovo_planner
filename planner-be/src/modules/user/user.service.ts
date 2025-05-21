import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/models/user.model';
import {
  UpdateAvatarDto,
  UpdatePasswordDto,
  UpdateNameDto,
  UpdateEmailDto,
} from './dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly configService: ConfigService,
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
  async updateName(userId: string, userDto: UpdateNameDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.name = userDto.name;
    await user.save();
  }

  async updatePassword(userId: string, userDto: UpdatePasswordDto) {
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

  async updateEmail(userId: string, userDto: UpdateEmailDto) {
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

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: Partial<UserModel>) {
    const user = new this.userModel(userData);
    return user.save();
  }

  async deleteProfile(id: string) {
    //Todo list on email
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
