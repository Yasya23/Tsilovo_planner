import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieModel } from 'src/models/movie.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateMovieDto } from 'src/typing/dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
  ) {}

  async getAll(query: string) {
    let options = {};

    if (query) {
      options = {
        $or: [{ title: new RegExp(query, 'i') }],
      };
    }
    return this.movieModel
      .find(options)
      .select('-v')
      .sort({ createdAt: 'desc' })
      .populate('actors genres')
      .exec();
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
      .sort({ coutViews: -1 })
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
