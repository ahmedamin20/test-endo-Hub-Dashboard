import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";

export const getCategories = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.CATEGORIES}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const cateogryDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return data;
  };
  export const postCategory = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.CATEGORIES, body);
    return data;
  };
  export const updateCategory = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.CATEGORIES}/${id}`, body);
    return data;
  };
  export const getCategoryById= async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return data;
  };
  