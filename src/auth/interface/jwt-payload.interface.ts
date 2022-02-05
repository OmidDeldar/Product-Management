import { RoleEnum } from "../enum/role.enum";

export interface JwtPayload{
    username:string;
    role:RoleEnum[]
    userId:string;
}