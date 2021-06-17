import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endpoint } from '../entities/endpoint.entity';
import { IEndpoint } from '../interfaces';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoint)
    private cpRepository: Repository<Endpoint>,
  ) {}

  async create(data: IEndpoint) {
    const endpoint = this.cpRepository.create(data);
    await this.cpRepository.save(endpoint);

    return endpoint;
  }

  async readAll() {
    const endpoints = await this.cpRepository.find({
      select: ['id', 'url'],
      relations: ['endpointToRoles', 'endpointToRoles.role'],
    });

    return endpoints;
  }

  async readById(id: number): Promise<IEndpoint> {
    const endpoint = await this.cpRepository.findOne(id, {
      relations: ['roles'],
    });
    if (!endpoint) {
      throw new NotFoundException('Endpoint not found');
    }

    return endpoint;
  }
}
