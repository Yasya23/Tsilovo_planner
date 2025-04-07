import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/models/user.model';
import { UpdateUserDto } from 'src/typing/dto';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
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

  async update(userId: string, userDto: UpdateUserDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isEmailUnique = await this.userModel.findOne({
      email: userDto.email,
    });

    const isEmailTheSame = userDto.email === user.email;
    if (
      userDto.email &&
      !isEmailTheSame &&
      isEmailUnique &&
      userId === isEmailUnique.id
    ) {
      throw new NotFoundException('This email address is already used');
    }
    if (userDto.newPassword) {
      if (!userDto.password) {
        throw new BadRequestException(
          'Old password is required to update the password',
        );
      }
      // Check if the old password matches
      const isPasswordValid = await compare(userDto.password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Old password is incorrect');
      }
      // Hash and update the new password
      const salt = await genSalt(10);
      user.password = await hash(userDto.newPassword, salt);
    }
    if (userDto.email && !isEmailTheSame) user.email = userDto.email;
    if (userDto.name) user.name = userDto.name;
    if (!!userDto.isAdmin) user.isAdmin = true;

    await user.save();
    const { id, name, email } = user;
    return {
      id,
      name,
      email,
    };
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
