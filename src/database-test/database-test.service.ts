import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class DatabaseTestService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    await this.userRepository.update(id, userDto);
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
