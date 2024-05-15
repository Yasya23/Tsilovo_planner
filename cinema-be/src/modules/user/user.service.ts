import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/models/user.model';
import { UpdateUserDto } from 'src/typing/dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async getTotalCount() {
    return this.userModel.find().count().exec();
  }

  async getAll(query: string) {
    let options = {};

    if (query) {
      options = {
        $or: [{ email: new RegExp(query, 'i') }],
      };
    }
    return this.userModel
      .find(options)
      .select('-password -v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getByID(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, userDto: UpdateUserDto) {
    console.log(id, userDto);
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    const isEmailUnique = await this.userModel.findOne({
      email: userDto.email,
    });
    if (userDto.email && isEmailUnique && id === isEmailUnique.id) {
      throw new NotFoundException('This email address is already used');
    }
    if (userDto.password) {
      const numberForSaltGenerator = 10;
      const salt = await genSalt(numberForSaltGenerator);
      user.password = await hash(userDto.password, salt);
    }
    user.email = userDto.email;
    if (!!userDto.isAdmin) user.isAdmin = userDto.isAdmin;
    await user.save();
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
