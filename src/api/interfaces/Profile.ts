import { Response } from "./Response";

export interface Profile {
    id: number,
    name: string,
    email: string,
    avatar?: any
}
export interface Password{
    new_password_confirmation: string,
    old_password: string,
    new_password: string
}



export type ProfileResponse = Response<Profile>;
