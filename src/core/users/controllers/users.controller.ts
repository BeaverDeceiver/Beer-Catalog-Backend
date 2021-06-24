import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { HasAccessGuard } from 'src/common/guards/has-access.guard';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, HasAccessGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async readAll() {
    return await this.usersService.readAll();
  }

  @Get(':id')
  async readById(
    @Headers('authorization') header: string,
    @Param('id') id: number,
  ) {
    return await this.usersService.readById(id, header);
  }
}
