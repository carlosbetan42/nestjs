import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const getUser = await this.userRepository.findOne(id);
    if (!getUser) {
      throw new NotFoundException('User not found');
    }
    return getUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const getUser = await this.findOne(id);
    const updatedUser = this.userRepository.merge(getUser, updateUserDto);
    this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const getUser = await this.findOne(id);
    this.userRepository.remove(getUser);
  }
}
