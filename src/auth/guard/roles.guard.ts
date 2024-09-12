import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private  reflector:Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean{

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    
    
    if (!role){
      return true;
    }

    const { user } = context.switchToHttp().getRequest()
    console.log(role, user.role_id);

    if(user.role_id === Role.ADMIN){
      return true;
    }

    return role === user.role_id;
  }
}
