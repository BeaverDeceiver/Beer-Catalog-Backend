import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseToken } from '../../../common/helpers/JWT';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { UserInfo } from '../entities/user-info.entity';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async create(userData: IUser) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingEmail = await this.userRepository.findOne(
        { email: userData.email },
        { select: ['email'] },
      );

      if (existingEmail) {
        throw new BadRequestException('Such email is already in use');
      }

      const newUser = this.userRepository.create({
        email: userData.email,
        password: userData.password,
      });
      await queryRunner.manager.save(newUser);

      const newUserInfo = this.userInfoRepository.create({
        user: newUser,
      });
      await queryRunner.manager.save(newUserInfo);

      await queryRunner.commitTransaction();

      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async readAll() {
    return await this.userRepository.find({
      select: ['id', 'email'],
      relations: ['userInfo', 'userToRoles', 'userToRoles.role'],
    });
  }

  async readById(id: number, header = null) {
    const user = await this.userRepository.findOne(id, {
      select: ['id', 'email', 'firstName', 'lastName'],
      relations: ['userInfo', 'userToRoles', 'userToRoles.role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (header) {
      const userId = parseToken(header).id;
      if (user.id === userId) {
        return { ...user, isOwnProfile: true };
      }
    }
    return user;
  }

  async get(options: FindManyOptions<User>) {
    return await this.userRepository.find(options);
  }
}
