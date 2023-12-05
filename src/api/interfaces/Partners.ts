import { Response } from "./Response";

export interface Partner {
    id: string|number,
    name:string
    description: string
    link: string
    logo: any
}

export type PartnersResponse = Response<Partner[]>;
export type PartnerResponse = Response<Partner>;

