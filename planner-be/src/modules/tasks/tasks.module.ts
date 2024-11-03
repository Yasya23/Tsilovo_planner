import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { WeekTasksModel } from 'src/models/tasks.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: WeekTasksModel,
        schemaOptions: {
          collection: 'WeekTasks',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
