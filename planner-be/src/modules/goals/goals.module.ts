import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { DateModule } from '@/date/date.module';
import { GoalModel } from '@/modules/goals/model/goal.model';
import { TaskModule } from '@/tasks/tasks.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

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
    TaskModule,
    DateModule,
  ],
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService],
})
export class GoalsModule {}
