import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";

export const getUsers = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.USERS}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const userDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.USERS}/${id}`);
    return data;
  };
  export const postUser = async (body: any) => {
    const { data } = await defaultAPI.postForm(API_ENDPOINTS.USERS, body);
    return data;
  };
  export const updateUser = async (id:number,body: any) => {
    const { data } = await defaultAPI.postForm(`${API_ENDPOINTS.USERS}/${id}`, body);
    return data;
  };
  export const getUserById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.USERS}/${id}`);
    return data;
  };
  export const getRoles = async () => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.ROLES}`);
    return data;
  };
  