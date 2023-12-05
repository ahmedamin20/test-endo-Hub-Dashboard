import { Response } from "./Response";

export interface Statics {
    ads: number,
    blogs: number,
    categories: number,
    products: number,
    sections: number,
    messages: number,
    ourTeam: number,
    users: number,
    testimonials: number,
 
}

export type StaticsReponse = Response<Statics[]>;

