import { Response } from "./Response";

export interface Product {
    id?: string|number,
    name:any,
    quantity: any,
    price: any,
    description:any,
    main_image: any,
    other_images:any[],
    category_id?:any,

    delete_other_images?:any[]
}
interface ProductOtherImages {
    id:string|number,
    url:any
}


export type ProductsResponse = Response<Product[]>;
export type ProductResponse = Response<Product>;

