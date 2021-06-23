import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_ROLE } from 'src/common/constants/roles.constants';
import { User, UserInfo } from 'src/core/users/entities';
import { RolesService } from 'src/core/users/services/roles.service';
import { Connection, Repository } from 'typeorm';
import { RegisterUserDto } from '../dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    private rolesService: RolesService,
    private connection: Connection,
  ) {}

  async signUp(data: RegisterUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingEmail = await this.userRepository.findOne(
        { email: data.email },
        { select: ['email'] },
      );

      if (existingEmail) {
        throw new BadRequestException('Such email is already in use');
      }

      const newUser = this.userRepository.create({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await queryRunner.manager.save(newUser);

      await this.rolesService.addToUser(newUser, DEFAULT_ROLE, queryRunner);

      const newUserInfo = this.userInfoRepository.create({
        user: newUser,
      });
      await queryRunner.manager.save(newUserInfo);
      await queryRunner.commitTransaction();

      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
