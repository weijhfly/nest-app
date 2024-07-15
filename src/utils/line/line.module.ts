import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineService } from './line.service';
import { LineSdkProvider } from './line.provider';

@Module({
  imports: [ConfigModule],
  providers: [LineService, LineSdkProvider],
  exports: [LineService],
})
export class LineModule {}
