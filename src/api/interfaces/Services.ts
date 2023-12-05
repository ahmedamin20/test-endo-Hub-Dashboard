import { Response } from "./Response";

export interface Service {
    id: number,
    name: string,
    price: string,
    image?: any,
    description: string,
}



export type ServicesResponse = Response<Service[]>;
export type ServiceResponse = Response<Service>;
