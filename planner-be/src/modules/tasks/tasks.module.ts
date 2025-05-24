import { StatisticsModule } from '../statistics/statistics.module';
import { TaskModel } from './model/tasks.model';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TaskModel,
        schemaOptions: {
          collection: 'Tasks',
        },
      },
    ]),
    ConfigModule,
    StatisticsModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
