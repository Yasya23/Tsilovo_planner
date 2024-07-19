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
import { Auth } from 'src/decorators/auth.decorator';
import { MovieService } from './movie.service';
import { CreateMovieDto } from 'src/typing/dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(
    @Query('query') query?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') type?: string,
  ) {
    return this.movieService.getAll(query, page, limit, type);
  }

  @Get('by-actor/:actorId')
  async getByActor(@Param('actorId') actorId: string) {
    return this.movieService.getByActor(actorId);
  }

  @Get('popular')
  async getMostPopular() {
    return this.movieService.getMostPopular();
  }

  @Get(':id')
  async getByID(@Param('id') id: string) {
    return this.movieService.getByID(id);
  }

  @Post('genres')
  async getByGenres(@Body('genresIds') genresIds: string[]) {
    return this.movieService.getByGenres(genresIds);
  }

  @Put('views/:id')
  async updateViews(@Param('id') id: string) {
    return this.movieService.updateViews(id);
  }

  @Post()
  @Auth('admin')
  async update() {
    return await this.movieService.create();
  }

  @Put(':id')
  @Auth('admin')
  async updateMovie(@Param('id') id: string, @Body() dto: CreateMovieDto) {
    await this.movieService.update(id, dto);
    return { message: 'Movie updated successfully' };
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    await this.movieService.delete(id);
    return { message: 'Movie deleted successfully' };
  }
}
