import { Response } from "./Response";

export interface Blogs {
    id: string|number,
    title:string
    description: string
    blogImage?: any
    created_at: string
    blog_image?:any
}

export type BlogsResponse = Response<Blogs[]>;
export type BlogResponse = Response<Blogs>;

