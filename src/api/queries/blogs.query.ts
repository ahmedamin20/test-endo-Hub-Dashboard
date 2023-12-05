import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";

export const getBlogs = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(
      `${API_ENDPOINTS.BLOGS}?handle=${handle}&per_page=${per_page}&page=${page}`
    );
    return data;
  };
  export const blogDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.BLOGS}/${id}`);
    return data;
  };
  
  export const postBlog = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.BLOGS, body);
    return data;
  };
  export const getBlogById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.BLOGS}/${id}`);
    return data;
  };
  export const updateBlog = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.BLOGS}/${id}`, body);
    return data;
  };