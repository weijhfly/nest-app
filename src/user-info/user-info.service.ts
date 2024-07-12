import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserInfo } from './entities/user-info.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private messageRepository: Repository<UserInfo>,
  ) {}
  findAll(): Promise<UserInfo[]> {
    return this.messageRepository.find();
  }

  findOne(id: string): Promise<UserInfo> {
    return this.messageRepository.findOne({
      where: { id },
    });
  }

  async create(createUserInfoDto: CreateUserInfoDto): Promise<UserInfo> {
    const msg = this.messageRepository.create(createUserInfoDto);
    await this.messageRepository.save(msg);
    return msg;
  }

  async update(
    id: string,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UserInfo> {
    await this.messageRepository.update(id, updateUserInfoDto);
    return this.messageRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
