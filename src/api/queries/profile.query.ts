import { defaultAPI } from "@/api/axios";
import { Setting } from "../interfaces/Settings";
import { API_ENDPOINTS } from "@/constants/Constants";
import { Password, Profile } from "../interfaces/Profile";

export const getProfile = async () => {
  const { data } = await defaultAPI.get(API_ENDPOINTS.PROFILE);
  return data;
};

export const updateProfile = async (body: any) => {
  const { data } = await defaultAPI.postForm(API_ENDPOINTS.PROFILE, body);
  return data;
};
export const updatePassword = async (body: Password) => {
  const { data } = await defaultAPI.put(API_ENDPOINTS.PASSWORD, body);
  return data;
};
