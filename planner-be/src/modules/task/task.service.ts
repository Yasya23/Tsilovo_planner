import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from 'src/models/task.model';
import { TaskDto } from 'src/typing/dto';
import { ModelType } from '@typegoose/typegoose/lib/types';

interface TaskQueryFilters {
  userId: string;
  dueDate: string;
  group?: string;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>,
  ) {}

  async getAll(userId: string, query: { dueDate: string; group?: string }) {
    const filter: TaskQueryFilters = { userId, dueDate: query.dueDate };

    if (query.group) {
      filter.group = query.group;
    }

    return await this.taskModel.find(filter).exec();
  }

  async create(userId: string, dto: TaskDto) {
    console.log(userId);
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
