import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}
  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne({
      where: { id },
    });
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const msg = this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(msg);
    return msg;
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    await this.messageRepository.update(id, updateMessageDto);
    return this.messageRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }

  findByUserId(userId: string): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .where('message.userId = :userId', { userId })
      .getMany();
  }
}
