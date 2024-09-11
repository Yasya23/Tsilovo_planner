import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/models/user.model';
import { UpdateUserDto } from 'src/typing/dto';
import { genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';

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
    const user = await this.userModel.findById(id).populate('favorites').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, userDto: UpdateUserDto) {
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
    if (userDto.email) user.email = userDto.email;
    if (!!userDto.isAdmin) user.isAdmin = userDto.isAdmin;
    await user.save();
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
    const userId = user.id;
    const favorites: Types.ObjectId[] = user.favorites as Types.ObjectId[];

    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((favoriteId) => favoriteId !== movieId)
      : [...favorites, movieId];

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { favorites: updatedFavorites }, { new: true })
      .exec();

    return updatedUser;
  }

  async getFavorites(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'favorites',
        model: 'MovieModel',
        populate: { path: 'genres' },
      })
      .exec();
    return user ? user.favorites : [];
  }
}
