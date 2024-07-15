import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageType, Platform } from '@src/common/types';
import { MessageService } from '../message/message.service';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
    private readonly userInfoService: UserInfoService,
  ) {}

  /**
   * 处理不同平台的Webhook消息
   * @param platform - 消息来源平台
   * @param body - 消息体
   * @returns 处理结果，是否成功
   */
  async handleMessage(
    platform: Platform,
    body: Record<string, any>,
  ): Promise<boolean> {
    console.log(`${platform} webhook receive:`, JSON.stringify(body));

    let result;

    // 根据平台解析消息
    switch (platform) {
      case Platform.FACEBOOK:
      case Platform.INSTAGRAM:
        result = this.parseFacebookMessage(body);
        break;
      case Platform.LINE:
        result = this.parseLineMessage(body);
        break;
      case Platform.WHATSAPP:
        result = this.parseWhatsAppMessage(body);
        break;
      default:
        throw new Error(`不支持的平台: ${platform}`);
    }

    if (!result || result.messages.length === 0) {
      return false;
    }

    // 创建一个 Map 来存储 platformUserId 和对应的 userId
    const userIdMap = new Map<string, string>();

    // 先保存或更新联系人信息
    for (const contact of result.contacts) {
      const existingUser = await this.userInfoService.findOneByPlatformUserId(
        contact.platformUserId,
      );

      let userId: string;
      if (existingUser) {
        userId = existingUser.id;
      } else {
        // 如果用户不存在，创建新用户
        const newUser = await this.userInfoService.create({
          ...contact,
          platform,
        });
        userId = newUser.id;
      }

      userIdMap.set(contact.platformUserId, userId);
    }

    // 然后保存消息
    for (const message of result.messages) {
      const userId = userIdMap.get(message.platformUserId);
      if (userId) {
        await this.messageService.saveMessage({
          ...message,
          userId,
        });
      } else {
        console.error(`无法找到对应的用户ID: ${message.platformUserId}`);
      }
    }

    return true;
  }

  /**
   * 解析Facebook或Instagram消息
   * @param body - 消息体
   * @returns 解析结果，包含消息和联系人信息
   */
  parseFacebookMessage(body: Record<string, any>) {
    const entry = body.entry?.[0];
    const messaging = entry?.messaging;

    if (!body.object || !messaging) {
      return { messages: [], contacts: [] };
    }

    const messages = [];
    const contacts = [];

    for (const msg of messaging) {
      const senderId = msg.sender?.id;
      const timestamp = msg.timestamp;
      const message = msg.message;
      const text = message?.text;
      const attachment = message?.attachments?.[0];
      const type = attachment?.type || (text ? MessageType.TEXT : null);

      if (!message || message.is_echo || !type) {
        continue;
      }

      messages.push({
        type,
        createTime: new Date(timestamp),
        isFromUser: true,
        content: text || attachment.payload.url,
        platformUserId: senderId,
      });

      contacts.push({
        platformUserId: senderId,
        userName: 'unknown',
      });
    }

    return { messages, contacts };
  }

  /**
   * 处理Line平台的Webhook消息
   * @param body - 消息体
   * @returns 解析结果，包含消息和联系人信息
   */
  parseLineMessage(body: Record<string, any>) {
    const messages = [];
    const contacts = [];

    for (const event of body.events) {
      if (event.type !== 'message') {
        continue;
      }

      const type = event.message.type;
      const messageId = event.message.id;
      const platformUserId = event.source.userId;
      const timestamp = event.timestamp;

      messages.push({
        type,
        createTime: new Date(timestamp),
        isFromUser: true,
        content: event.message.text || messageId,
        platformUserId,
      });

      contacts.push({
        platformUserId,
        userName: 'unknown',
      });
    }

    return { messages, contacts };
  }

  /**
   * 处理WhatsApp平台的Webhook消息
   * @param body - 消息体
   * @returns 解析结果，包含消息和联系人信息
   */
  parseWhatsAppMessage(body: Record<string, any>) {
    const value = body.entry?.[0]?.changes?.[0]?.value;
    const field = body.entry?.[0]?.changes?.[0]?.field;

    if (!body.object || !value?.messages || field !== 'messages') {
      return { messages: [], contacts: [] };
    }

    const messages = [];
    const contacts = [];

    for (const contact of value.contacts) {
      contacts.push({
        platformUserId: contact.wa_id,
        userName: contact.profile?.name || 'unknown',
      });
    }

    for (const msg of value.messages) {
      const { from, type, timestamp, text, image, video } = msg;

      messages.push({
        type,
        createTime: new Date(Number(timestamp) * 1000),
        isFromUser: true,
        content: text?.body || image?.id || video?.id,
        platformUserId: from,
      });
    }

    return { messages, contacts };
  }

  /**
   * 验证Webhook （WhatsApp、Facebook需要）
   * @param platform - 平台名称
   * @param query - 查询参数
   * @returns 验证结果，返回challenge
   */
  async verifyWebhook(platform: string, query: any): Promise<string> {
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];
    const webhookToken = this.configService.get('WEBHOOK_TOKEN');

    if (mode && token && mode === 'subscribe' && token === webhookToken) {
      return challenge;
    } else {
      throw new BadRequestException('无效的数据');
    }
  }
}
