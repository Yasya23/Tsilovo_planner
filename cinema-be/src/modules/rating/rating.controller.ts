import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from 'src/typing/dto/rating/rating.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':movieId')
  @Auth()
  async getRatingByUser(
    @User('id') userId: string,
    @Param('movieId')
    movieId: string,
  ) {
    return this.ratingService.getValueByUser(movieId, userId);
  }

  @Put()
  @Auth()
  async setRating(@User('id') userId: string, @Body() dto: RatingDto) {
    return this.ratingService.setRating(userId, dto);
  }
}
