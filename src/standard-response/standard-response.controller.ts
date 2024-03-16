import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ItemDto } from './dto/create-item.dto';
import { StandardResponseService } from './standard-response.service';

@Controller('standard-response')
export class StandardResponseController {
  constructor(
    private readonly standardResponseService: StandardResponseService,
  ) {}

  // 验证主动抛异常
  @Get('error')
  throwError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // 验证成功返回
  @Get('success')
  getSuccess() {
    return 'success';
  }

  // 验证 ValidationPipe
  @Post('pipe')
  async createItem(@Body() itemDto: ItemDto) {
    return itemDto;
  }
}
