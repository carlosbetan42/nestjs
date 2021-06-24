import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return {
      success: true,
      task: await this.tasksService.create(createTaskDto),
      message: 'Task created successfully',
    };
  }

  @Get('/user/:id')
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      tasks: await this.tasksService.findAll(id),
      message: 'Tasks found successfully',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      task: await this.tasksService.findOne(id),
      message: 'Task found successfully',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.tasksService.update(id, updateTaskDto);
    return {
      success: true,
      message: 'Task updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tasksService.remove(id);
    return {
      success: true,
      message: 'Task removed successfully',
    };
  }
}
