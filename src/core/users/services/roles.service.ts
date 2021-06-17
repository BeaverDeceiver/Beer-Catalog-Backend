import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  Connection,
  QueryRunner,
  Repository,
  WhereExpression,
} from 'typeorm';
import { UserToRole } from '../entities';
import { Role } from '../entities/role.entity';
import { IRole, IRolesOptions, IUser } from '../interfaces';

@Injectable()
export class RolesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserToRole)
    private userToRoleRepository: Repository<UserToRole>,
  ) {}

  async create(data: IRole) {
    const role = this.roleRepository.create(data);
    await this.roleRepository.save(role);

    return role;
  }

  async addToUser(user: IUser, roleId: number, queryRunner: QueryRunner) {
    try {
      const role = await this.roleRepository.findOne({ id: roleId });
      const userRole = this.userToRoleRepository.create({
        role: role,
        user: user,
      });
      await queryRunner.manager.save(userRole);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    }
  }

  async readAll(options: IRolesOptions) {
    return await this.connection
      .getRepository(Role)
      .createQueryBuilder('roles')
      .select(['roles.id', 'roles.name'])
      .leftJoinAndSelect('roles.endpointToRoles', 'endpointToRoles')
      .leftJoinAndSelect('endpointToRoles.endpoint', 'endpoints')
      .where(
        new Brackets((qb) => {
          this.readAllOptions(qb, options);
        }),
      )
      .take(options.limit || 0)
      .skip(options.offset || 0)
      .orderBy(options.sortBy || 'roles.id', options.sortDirection || 'ASC')
      .getMany();
  }

  readAllOptions(qb: WhereExpression, options: IRolesOptions) {
    qb.andWhere('(roles.deletedDate IS NULL)');
    if (options.name) {
      qb.andWhere('roles.name = :name', {
        name: options.name,
      });
    }
    if (options.permissionMask) {
      qb.andWhere('endpointToRoles.permission_mask = :mask', {
        mask: options.permissionMask,
      });
    }
    if (options.url) {
      qb.andWhere('endpoints.url = :url', {
        url: options.url,
      });
    }
  }

  async readById(id: number) {
    const role = await this.connection
      .getRepository(Role)
      .createQueryBuilder('roles')
      .select(['roles.id', 'roles.name'])
      .leftJoinAndSelect('roles.endpointToRoles', 'endpointToRoles')
      .leftJoinAndSelect('endpointToRoles.endpoint', 'endpoints')
      .where('roles.id = :id', { id: id })
      .getOne();
    return role;
  }
}
