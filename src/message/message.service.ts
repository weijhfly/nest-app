import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageType, Platform } from '@src/common/types';
import { FacebookService } from '@src/utils/facebook/facebook.service';
import { LineService } from '@src/utils/line/line.service';
import { WhatsAppService } from '@src/utils/whatsapp/whatsapp.service';
import { Repository } from 'typeorm';
import { UserInfoService } from '../user-info/user-info.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly userInfoService: UserInfoService,
    private readonly facebookService: FacebookService,
    private readonly lineService: LineService,
    private readonly whatsappService: WhatsAppService,
  ) {}

  /**
   * 发送不同平台的消息
   * @param platform - 消息平台
   * @param createMessageDto - 消息参数
   * @returns 处理结果，是否成功
   */
  async sendMessage(
    platform: Platform,
    createMessageDto: CreateMessageDto,
  ): Promise<boolean> {
    const { userId, type, content } = createMessageDto;
    const { platformUserId } = await this.userInfoService.findOne(userId);

    switch (platform) {
      case Platform.FACEBOOK:
      case Platform.INSTAGRAM:
        await this.sendFacebookMessage(platformUserId, type, content);
        break;

      case Platform.LINE:
        await this.sendLineMessage(platformUserId, type, content);

        break;
      case Platform.WHATSAPP:
        await this.sendWhatsAppMessage(platformUserId, type, content);

        break;
      default:
        throw new Error(`不支持的平台: ${platform}`);
    }

    createMessageDto.isFromUser = false;
    await this.saveMessage(createMessageDto);

    return true;
  }

  async saveMessage(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(message);
  }

  private async sendFacebookMessage(
    userId: string,
    type: MessageType,
    content: string,
  ) {
    if (type === MessageType.TEXT) {
      return this.facebookService.sendTextMessage(userId, content);
    } else if (type === MessageType.IMAGE || type === MessageType.VIDEO) {
      return this.facebookService.sendMediaMessage(userId, type, content);
    }
  }

  private async sendLineMessage(
    userId: string,
    type: MessageType,
    content: string,
  ) {
    if (type === MessageType.TEXT) {
      return this.lineService.sendTextMessage(userId, content);
    } else if (type === MessageType.IMAGE || type === MessageType.VIDEO) {
      return this.lineService.sendMediaMessage(userId, type, content);
    }
  }

  private async sendWhatsAppMessage(
    userId: string,
    type: MessageType,
    content: string,
  ) {
    if (type === MessageType.TEXT) {
      return this.whatsappService.sendTextMessage(Number(userId), content);
    } else if (type === MessageType.IMAGE || type === MessageType.VIDEO) {
      return this.whatsappService.sendMediaMessage(
        Number(userId),
        type,
        content,
      );
    }
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne({
      where: { id },
    });
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
