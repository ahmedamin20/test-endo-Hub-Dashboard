import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";

export const getPartners = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PARTNERS}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const partnerDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.PARTNERS}/${id}`);
    return data;
  };
  export const postPartner = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.PARTNERS, body);
    return data;
  };
  export const updatePartner = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.PARTNERS}/${id}`, body);
    return data;
  };
  export const getPartnerById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PARTNERS}/${id}`);
    return data;
  };
  