import { API_ENDPOINTS } from "@/constants/Constants";
import { defaultAPI } from "../axios";
import { adType } from "../interfaces/Teams";
import { Role, RoleBody } from "../interfaces/Roles";

export const getRoles = async (
    per_page?: number,
    page?: number,
    handle?: string
  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.ROLES}?per_page=${per_page}&handle=${handle}&page=${page}`);
    return data;
  };
  export const getPermissions = async (

  ) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.PERMISSIONS}`);
    return data;
  };
  export const roleDelete = async (id: number) => {
    const { data } = await defaultAPI.delete(`${API_ENDPOINTS.ROLES}/${id}`);
    return data;
  };
  export const postRole = async (body: RoleBody) => {
    const { data } = await defaultAPI.post(API_ENDPOINTS.ROLES, body);
    return data;
  };
  export const updateRole = async (id:number,body: RoleBody) => {
    const { data } = await defaultAPI.put(`${API_ENDPOINTS.ROLES}/${id}`, body);
    return data;
  };
  export const getRoleById = async (id: number) => {
    const { data } = await defaultAPI.get(`${API_ENDPOINTS.ROLES}/${id}`);
    return data;
  };
  