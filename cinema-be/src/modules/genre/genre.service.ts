import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GenreModel } from 'src/models/genre.model';
import { UpdateGenreDto } from 'src/typing/dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>,
  ) {}

  async getAll(query: string) {
    let options = {};

    if (query) {
      options = {
        $or: [
          { name: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
        ],
      };
    }
    return this.genreModel
      .find(options)
      .select('-v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getByID(id: string) {
    const genre = await this.genreModel.findById(id);
    if (!genre) throw new NotFoundException('Genre not found');
    return genre;
  }

  async create() {
    const defaultGenre: UpdateGenreDto = {
      name: '',
      description: '',
      icon: '',
    };
    const newGenre = await this.genreModel.create(defaultGenre);
    return newGenre.id;
  }

  async update(id: string, genreDto: UpdateGenreDto) {
    const genre = await this.genreModel.findByIdAndUpdate(id, genreDto).exec();
    if (!genre) throw new NotFoundException("Genre doesn't exist");
    return genre;
  }

  async delete(id: string) {
    const deletedGenre = await this.genreModel.findByIdAndDelete(id).exec();
    if (!deletedGenre) throw new NotFoundException("Genre doesn't exist");
    return deletedGenre;
  }
}
