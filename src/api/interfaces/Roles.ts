import { Response } from "./Response";

export interface Role {
  id?: number;
  name: string;
  
}
export interface RoleBody {
  name: string;
  permissions: any[];
}
export interface Permission{
  id:number|string,
  name:string
}
export interface RoleById{
  id?: number;
  name: string;
  permissions: any[];
}



export type RolesResponse = Response<Role[]>;
export type RoleResponse = Response<RoleById>;
export type PermissionsResponse = Response<Permission[]>;
export type RoleByIdResponse = Response<RoleById>;
