import { Injectable } from '@nestjs/common';
import { RatingModel } from 'src/models/rating.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RatingDto } from 'src/typing/dto/rating/rating.dto';
import { MovieModel } from 'src/models/movie.model';
import { Types } from 'mongoose';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(MovieModel)
    private movieModel: ModelType<MovieModel>,

    @InjectModel(RatingModel)
    private readonly ratingModel: ModelType<RatingModel>,
  ) {}

  async getValueByUser(movieId: string, userId: string) {
    return await this.ratingModel
      .findOne({ movieId, userId })
      .select('value')
      .exec()
      .then((data) => (data ? data.value : 0));
  }

  async setRating(userId: string, { movieId, value }: RatingDto) {
    const newRating = await this.ratingModel
      .findOneAndUpdate(
        { userId, movieId },
        { userId, movieId, value },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      )
      .exec();

    const averageRating = await this.ratingModel
      .aggregate([
        { $match: { movieId: new Types.ObjectId(movieId) } },
        {
          $group: {
            _id: '$movieId',
            averageValue: { $avg: '$value' },
          },
        },
      ])
      .exec()
      .then((data) => {
        if (data && data.length > 0) {
          return data[0].averageValue;
        }
        return null;
      });

    if (averageRating !== null) {
      await this.movieModel
        .findByIdAndUpdate(movieId, { rating: averageRating }, { new: true })
        .exec();
    }

    return newRating;
  }
}
