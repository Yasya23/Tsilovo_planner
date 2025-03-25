import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskModel } from 'src/models/tasks.model';
import { Types } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: ModelType<TaskModel>,
  ) {}

  async getTasksByGoalIdsAndDateRange(
    goalIds: Types.ObjectId[],
    startDate: Date,
    endDate: Date,
  ) {
    return await this.taskModel
      .find({
        goal: { $in: goalIds },
        date: { $gte: startDate, $lte: endDate },
      })
      .select('goal title date isCompleted')
      .exec();
  }

  async create(userId: string, dto: CreateTaskDto[]) {
    // Mapping CreateTaskDto to TaskModel format, including userId
    const tasksToCreate = dto.map((task) => ({
      userId,
      title: task.title,
      goal: new Types.ObjectId(task.goalId),
      date: task.date,
      isCompleted: task.isCompleted,
    }));

    // Create tasks and insert them into the database
    const createdTasks = await this.taskModel.create(tasksToCreate);
    return createdTasks;
  }

  // Update tasks based on TaskDto array
  async update(dto: TaskDto[]) {
    const updatedTasks = dto.map(async (taskData) => {
      const task = await this.taskModel.findByIdAndUpdate(
        taskData._id,
        {
          title: taskData.title,
          goal: new Types.ObjectId(taskData.goalId),
          date: taskData.date,
          isCompleted: taskData.isCompleted,
        },
        { new: true },
      );

      if (!task) {
        throw new NotFoundException(`Task with id ${taskData._id} not found`);
      }

      return task;
    });

    // Wait for all update operations to complete and return the updated tasks
    return await Promise.all(updatedTasks);
  }

  // Optionally, add a delete method if required
  async delete(dto: TaskDto[]) {
    const deletedTasks = await Promise.all(
      dto.map(async (taskData) => {
        const task = await this.taskModel.findByIdAndDelete(taskData._id);

        if (!task) {
          throw new NotFoundException(`Task with id ${taskData._id} not found`);
        }

        return task;
      }),
    );

    return deletedTasks;
  }
}
