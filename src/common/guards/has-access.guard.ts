import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RolesService } from '../../core/users/services/roles.service';
import { UsersService } from '../../core/users/services/users.service';

type Payload = { id: string; email: string };

const getInt = (methodName: string) => {
  switch (methodName) {
    case 'GET':
      return 1;
    case 'POST':
      return 2;
    case 'PUT':
      return 4;
    case 'DELETE':
      return 8;
  }
};

@Injectable()
export class HasAccessGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const payload = request.user as Payload;
    const user = await this.usersService.readById(parseInt(payload.id, 10));

    for (const userToRole of user.userToRoles) {
      const endpoints = (await this.rolesService.readById(userToRole.role.id))
        .endpointToRoles;
      for (const endpoint of endpoints) {
        if (
          RegExp(endpoint.endpoint.url).test(request.originalUrl) &&
          endpoint.permissionMask & getInt(request.method)
        ) {
          return true;
        }
      }
    }

    return false;
  }
}
