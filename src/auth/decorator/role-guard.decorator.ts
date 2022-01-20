import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../enum/role.enum";


export const ROLES='roles';
export const RoleGuardDecorator=(...roles: RoleEnum[]) => SetMetadata(ROLES,roles)