import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Platform } from '@src/common/types';
import { Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':platform')
  @ApiOperation({ summary: '接收社媒平台的消息' })
  @ApiBody({ type: Object })
  async receiveMessage(
    @Param('platform') platform: Platform,
    @Body() body: Record<string, any>,
  ) {
    return this.webhookService.handleMessage(platform, body);
  }

  @Get(':platform')
  @ApiOperation({ summary: '验证社媒平台的Webhook' })
  async verifyWebhook(
    @Param('platform') platform: Platform,
    @Query() query: any,
    @Res() res: Response,
  ) {
    const result = this.webhookService.verifyWebhook(platform, query);

    return res.status(HttpStatus.OK).send(result);
  }
}
