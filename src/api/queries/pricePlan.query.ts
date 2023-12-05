import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";
import { PricePlan } from "../interfaces/PricePlan";

export const getPricePlans = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PRICE_PLANS}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const pricePlanDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.PRICE_PLANS}/${id}`);
    return data;
  };
  export const postPricePlan = async (body: PricePlan) => {
    const { data } = await defaultAPI.post(API_ENDPOINTS.PRICE_PLANS, body);
    return data;
  };
  export const updatePricePlan = async (id:number,body: any) => {
    const { data } = await defaultAPI.post(`${API_ENDPOINTS.PRICE_PLANS}/${id}`, body);
    return data;
  };
  export const getPricePlanById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PRICE_PLANS}/${id}`);
    return data;
  };
  