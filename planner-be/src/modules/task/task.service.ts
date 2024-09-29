import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from 'src/models/task.model';
import { TaskDto } from 'src/typing/dto';
import { ModelType } from '@typegoose/typegoose/lib/types';

interface TaskQueryFilters {
  userId: string;
  status?: string;
  dueDate?: Date;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>,
  ) {}

  async getAll(userId: string, query: { dueDate?: string }) {
    const whereConditions: TaskQueryFilters = { userId };

    // if (query.dueDate) {
    //   const parsedDueDate = new Date(query.dueDate);
    //   if (!isNaN(parsedDueDate.getTime())) {
    //     whereConditions.dueDate = parsedDueDate;
    //   } else {
    //     throw new Error('Invalid dueDate format');
    //   }
    // } else {
    //   whereConditions.dueDate = new Date();
    // }

    const tasks = await this.taskModel.find(whereConditions).exec();
    return tasks;
  }

  async create(userId: string, dto: TaskDto) {
    const task = new this.taskModel({ ...dto, userId });
    await task.save();

    return task;
  }

  async update(id: string, dto: TaskDto) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async delete(id: string) {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
