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
    private userInfoRepository: Repository<UserInfo>,
  ) {}
  findAll(): Promise<UserInfo[]> {
    return this.userInfoRepository.find();
  }

  findOne(id: string): Promise<UserInfo> {
    return this.userInfoRepository.findOne({
      where: { id },
    });
  }

  findOneByPlatformUserId(platformUserId: string): Promise<UserInfo> {
    return this.userInfoRepository.findOne({
      where: { platformUserId },
    });
  }

  async create(createUserInfoDto: CreateUserInfoDto): Promise<UserInfo> {
    const msg = this.userInfoRepository.create(createUserInfoDto);
    await this.userInfoRepository.save(msg);
    return msg;
  }

  async update(
    id: string,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UserInfo> {
    await this.userInfoRepository.update(id, updateUserInfoDto);
    return this.userInfoRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userInfoRepository.delete(id);
  }
}
