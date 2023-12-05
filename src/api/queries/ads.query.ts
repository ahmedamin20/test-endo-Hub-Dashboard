import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";

export const getAds = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.ADS}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const adsDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.ADS}/${id}`);
    return data;
  };
  export const postAd = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.ADS, body);
    return data;
  };
  export const updateAd = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.ADS}/${id}`, body);
    return data;
  };
  export const getAdById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.ADS}/${id}`);
    return data;
  };
  