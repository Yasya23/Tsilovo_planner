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
import { GenreService } from './genre.service';
import { UpdateGenreDto } from 'src/typing/dto';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAll(@Query('query') query?: string) {
    return this.genreService.getAll(query);
  }

  @Get(':id')
  @Auth('admin')
  async getByID(@Param('id') id: string) {
    return this.genreService.getByID(id);
  }

  @Post()
  @Auth('admin')
  async update() {
    return await this.genreService.create();
  }

  @Put(':id')
  @Auth('admin')
  async updateGenre(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    await this.genreService.update(id, dto);
    return { message: 'Genre updated successfully' };
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    await this.genreService.delete(id);
    return { message: 'Genre deleted successfully' };
  }
}
