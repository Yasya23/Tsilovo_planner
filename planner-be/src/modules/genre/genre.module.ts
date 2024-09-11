import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreModel } from 'src/models/genre.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GenreModel,
        schemaOptions: {
          collection: 'Genre',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
