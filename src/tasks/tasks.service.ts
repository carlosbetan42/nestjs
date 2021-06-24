import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const getUser = await this.userService.findOne(createTaskDto.user);
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user: getUser,
    });
    return this.taskRepository.save(newTask);
  }

  async findAll(userId: number) {
    const getUser = await this.userService.findOne(userId);

    return this.taskRepository.find({ user: getUser });
  }

  async findOne(id: number) {
    const getTask = await this.taskRepository.findOne(id, {
      relations: ['user'],
    });
    if (!getTask) {
      throw new NotFoundException('Task not found');
    }

    return getTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const getTask = await this.findOne(id);
    const getUser = await this.userService.findOne(getTask.user.id);
    const updatedTask = this.taskRepository.merge(getTask, {
      ...updateTaskDto,
      user: getUser,
    });
    this.taskRepository.save(updatedTask);
  }

  async remove(id: number) {
    const getTask = await this.findOne(id);

    return this.taskRepository.remove(getTask);
  }
}
