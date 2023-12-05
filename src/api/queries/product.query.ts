import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";

export const getProducts = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PRODUCTS}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const productDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return data;
  };
  export const postProduct = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.PRODUCTS, body);
    return data;
  };
  export const updateProduct = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.PRODUCTS}/${id}`, body);
    return data;
  };
  export const getProductById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return data;
  };
  export const getAllCategoriesSelect = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.CATEGORIES}`);
    return data;
  };