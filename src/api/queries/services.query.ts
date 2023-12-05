import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";

export const getServices = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.SERVICES}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const serviceDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.SERVICES}/${id}`);
    return data;
  };
  export const postService = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.SERVICES, body);
    return data;
  };
  export const updateService = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.SERVICES}/${id}`, body);
    return data;
  };
  export const getServiceById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.SERVICES}/${id}`);
    return data;
  };
  