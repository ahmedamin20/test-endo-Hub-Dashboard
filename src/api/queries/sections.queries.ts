import { defaultAPI } from "@/api/axios";
import { AboutUs } from "../interfaces/AboutUs";
import { API_ENDPOINTS } from "@/constants/Constants";

export const getSections = async (
  
) => {
  const { data } = await defaultAPI.get(`/admin/sections`);
  return data;
};
export const getSectionsTable = async (
  per_page?: number,
  page?: number,
  handle?: string
) => {
  const { data } = await defaultAPI.get(`/admin/sections?per_page=${per_page}&handle=${handle}&page=${page}`);
  return data;
};
export const getSelectSections = async (
  per_page?: number,
  page?: number,
  handle?: string
) => {
  const { data } = await defaultAPI.get(`/admin/sections?per_page=${per_page}`);
  return data;
};

export const updateAboutUs = async (body: AboutUs) => {
  const { data } = await defaultAPI.post("/admin/about_us", body);
  return data;
};

export const sectionDelete = async (id: number) => {
  const { data } = await defaultAPI.delete(`${API_ENDPOINTS.SECTIONS}/${id}`);
  return data;
};

export const postSection = async (body: {title:string}) => {
  const { data } = await defaultAPI.post(API_ENDPOINTS.SECTIONS, body);
  return data;
};

export const getSectionById = async (id: number) => {
  const { data } = await defaultAPI.get(`${API_ENDPOINTS.SECTIONS}/${id}`);
  return data;
};
export const updateSection = async (id: number, body: Partial<{title:string}>) => {
  const { data } = await defaultAPI.put(`${API_ENDPOINTS.SECTIONS}/${id}`, body);
  return data;
};