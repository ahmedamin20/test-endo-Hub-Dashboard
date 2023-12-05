import { Response } from "./Response";

export interface Category {
    id: string|number,
    name:string
    image: any
}

export type CategoriesResponse = Response<Category[]>;
export type CategoryResponse = Response<Category>;

