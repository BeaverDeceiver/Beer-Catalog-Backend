import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { EndpointDto } from '../dto/endpoint.dto';
import { EndpointsService } from '../services/endpoints.service';

@Controller('endpoints')
@UseGuards(JwtAuthGuard)
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() endpoint: EndpointDto) {
    return await this.endpointsService.create(endpoint);
  }

  @Get()
  async readAll() {
    return await this.endpointsService.readAll();
  }

  @Get()
  async readById(@Param('id', ParseIntPipe) id: number) {
    return await this.endpointsService.readById(id);
  }
}
