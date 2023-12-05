import { Response } from "./Response";

export interface PricePlan {
    id: string|number,
    name:string
    description: string,
    price:any
}

export type PricePlansResponse = Response<PricePlan[]>;
export type PricePlanResponse = Response<PricePlan>;

