import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Post,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from 'src/typing/dto';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  async getAll(@Query('query') query?: string) {
    return this.actorService.getAll(query);
  }

  @Get(':id')
  @Auth('admin')
  async getByID(@Param('id') id: string) {
    return this.actorService.getByID(id);
  }

  @Post()
  @Auth('admin')
  async update() {
    return await this.actorService.create();
  }

  @Put(':id')
  @Auth('admin')
  async updateActor(@Param('id') id: string, @Body() dto: ActorDto) {
    await this.actorService.update(id, dto);
    return { message: 'Actor updated successfully' };
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    await this.actorService.delete(id);
    return { message: 'Actor deleted successfully' };
  }
}
