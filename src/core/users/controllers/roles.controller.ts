import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { HasAccessGuard } from 'src/common/guards/has-access.guard';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RoleDto, RolesQueryParamsDto } from '../dto';
import { RolesService } from '../services/roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard, HasAccessGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async readAll(
    @Query()
    options: RolesQueryParamsDto,
  ) {
    return await this.rolesService.readAll(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async readById(@Param('id') id: number) {
    return await this.rolesService.readById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: RoleDto) {
    return await this.rolesService.create(createRoleDto);
  }
}
