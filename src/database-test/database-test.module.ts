import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseTestController } from './database-test.controller';
import { DatabaseTestService } from './database-test.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [DatabaseTestController],
  providers: [DatabaseTestService],
})
export class DatabaseTestModule {}
