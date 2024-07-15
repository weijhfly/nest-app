import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigTestModule } from './config-test/config-test.module';
import { StandardResponseModule } from './standard-response/standard-response.module';
import { DatabaseTestModule } from './database-test/database-test.module';
import { UserInfoModule } from './user-info/user-info.module';
import { MessageModule } from './message/message.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        // 自动加载实体，无需手动导入
        autoLoadEntities: true,
        // 是否根据实体自动同步数据库模型，生产环境慎用，可能会导致数据丢失
        synchronize: true,
      }),
    }),
    StandardResponseModule,
    ConfigTestModule,
    DatabaseTestModule,
    UserInfoModule,
    MessageModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
