import { defaultAPI } from "@/api/axios";
import { AboutUs } from "../interfaces/AboutUs";

export const getAboutUs = async () => {
  const { data } = await defaultAPI.get("/admin/about_us");
  return data;
};

export const updateAboutUs = async (body: any) => {
  const { data } = await defaultAPI.postForm("/admin/about_us", body);
  return data;
};
