import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES } from "../decorator/role-guard.decorator";
import { RoleEnum } from "../enum/role.enum";


export class GetUserContext {
    username:string
    roles:RoleEnum[]
  }
  export class RoleGuard implements CanActivate{
    constructor() {}
    canActivate(context: ExecutionContext): boolean {
      const reflector=new Reflector()
     const roles= reflector.getAllAndOverride<RoleEnum[]>(ROLES,[
        context.getClass(),
       context.getHandler()
      ])
  
      if(!roles)
        return true
   
      const {user}=context.switchToHttp().getRequest()
      
      const canActive=roles.some((role)=>user.role?.includes(role))
      return canActive
    }
  }