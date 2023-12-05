import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { WorkingHours } from "../interfaces/WorkingHours";

export const getWorkingHOurs = async () => {
    const { data } = await defaultAPI.get(API_ENDPOINTS.WORKING_HOURS);
    return data;
  };
  export const updateWorkingHours = async (body: WorkingHours) => {
    const { data } = await defaultAPI.put(API_ENDPOINTS.WORKING_HOURS, body);
    return data;
  };