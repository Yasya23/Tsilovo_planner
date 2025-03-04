import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { GoalModel } from 'src/models/goal.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GoalModel,
        schemaOptions: {
          collection: 'Goals',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [GoalsService],
  controllers: [GoalsController],
})
export class GoalsModule {}
