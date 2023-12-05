import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";

export const getStatics = async () => {
    const { data } = await defaultAPI.get(API_ENDPOINTS.STATICS);
    return data;
  };
  