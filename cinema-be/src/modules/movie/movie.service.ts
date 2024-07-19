import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieModel } from 'src/models/movie.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateMovieDto } from 'src/typing/dto';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
    private readonly telegramService: TelegramService,
  ) {}

  async getAll(query: string, page: number, limit: number) {
    let options = {};

    if (query) {
      options = {
        $or: [{ title: new RegExp(query, 'i') }],
      };
    }

    const skip = (page - 1) * limit;

    const [results, totalCount] = await Promise.all([
      this.movieModel
        .find(options)
        .select('-v')
        .sort({ createdAt: 'desc' })
        .populate('actors genres')
        .skip(skip)
        .limit(limit)
        .exec(),
      this.movieModel.countDocuments(options).exec(),
    ]);

    return {
      results,
      totalCount,
      page,
      limit,
    };
  }

  async getByID(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async getByActor(actorId: string) {
    const data = await this.movieModel.find({ actors: actorId }).exec();

    if (!data) throw new NotFoundException('Movies not found');
    return data;
  }

  async getByGenres(genresIDs: string[]) {
    const data = await this.movieModel
      .find({ genres: { $in: genresIDs } })
      .exec();
    if (!data) throw new NotFoundException('Movies not found');
    return data;
  }

  async getMostPopular() {
    const data = await this.movieModel
      .find({ countViews: { $gt: 0 } })
      .sort({ countViews: -1 })
      .limit(10)
      .populate('genres')
      .exec();

    return data;
  }

  async updateViews(id: string) {
    const movie = await this.movieModel
      .findByIdAndUpdate(id, { $inc: { countViews: 1 } }, { new: true })
      .exec();
    if (!movie) throw new NotFoundException("Movie doesn't exist");
    return movie;
  }

  async create() {
    const defaultMovie: CreateMovieDto = {
      title: '',
      description: '',
      poster: '',
      videoUrl: '',
      genres: [],
      actors: [],
    };
    const newMovie = await this.movieModel.create(defaultMovie);
    return newMovie.id;
  }

  async update(id: string, dto: CreateMovieDto) {
    if (!dto.isSendToTelegram) {
      //TODO Uncomment before production
      // if (process.env.NODE_ENV !== 'dev') {
      await this.telegramService.sendNotification(dto);
      dto.isSendToTelegram = true;
      // };
    }
    const movie = await this.movieModel.findByIdAndUpdate(id, dto).exec();
    if (!movie) throw new NotFoundException("Movie doesn't exist");
    return movie;
  }

  async delete(id: string) {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();
    if (!deletedMovie) throw new NotFoundException("Movie doesn't exist");
    return deletedMovie;
  }
}
