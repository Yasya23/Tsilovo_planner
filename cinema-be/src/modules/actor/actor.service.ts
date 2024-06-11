import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorModel } from 'src/models/actor.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ActorDto } from 'src/typing/dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly actorModel: ModelType<ActorModel>,
  ) {}

  async getAll(query: string) {
    let options = {};

    if (query) {
      options = {
        $or: [{ name: new RegExp(query, 'i') }],
      };
    }
    return this.actorModel
      .find(options)
      .select('-v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getByID(id: string) {
    const actor = await this.actorModel.findById(id);
    if (!actor) throw new NotFoundException('Actor not found');
    return actor;
  }

  async create() {
    const defaultGenre: ActorDto = {
      name: '',
      photo: '',
    };
    const newActor = await this.actorModel.create(defaultGenre);
    return newActor.id;
  }

  async update(id: string, actorDto: ActorDto) {
    const actor = await this.actorModel.findByIdAndUpdate(id, actorDto).exec();
    if (!actor) throw new NotFoundException("Actor doesn't exist");
    return actor;
  }

  async delete(id: string) {
    const deletedActor = await this.actorModel.findByIdAndDelete(id).exec();
    if (!deletedActor) throw new NotFoundException("Actor doesn't exist");
    return deletedActor;
  }
}
