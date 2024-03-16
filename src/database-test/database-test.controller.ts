import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DatabaseTestService } from './database-test.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('database-test')
export class DatabaseTestController {
  constructor(private readonly databaseTestService: DatabaseTestService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.databaseTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.databaseTestService.findOne(id);
  }

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.databaseTestService.create(userDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userDto: UserDto): Promise<User> {
    return this.databaseTestService.update(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.databaseTestService.remove(id);
  }
}
