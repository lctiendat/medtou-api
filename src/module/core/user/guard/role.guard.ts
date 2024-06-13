import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    console.log(roles);
    

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !roles.some(role => user.roles.includes(role))) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
