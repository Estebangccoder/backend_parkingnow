
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/rol.enum';


export const ROLES_KEY = 'role_id';
export const Roles = (role_id:Role) => SetMetadata(ROLES_KEY, role_id);
