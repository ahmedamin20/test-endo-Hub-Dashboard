import { Response } from "./Response";

export interface User {
    id: string|number,
    name:string
    avatar: any,
    email:string,
    role_id:string,
    password:string
}

export type UsersResponse = Response<User[]>;
export type UserResponse = Response<User>;

