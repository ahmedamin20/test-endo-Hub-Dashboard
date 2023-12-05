import { defaultAPI } from "@/api/axios";

export const getProducts = async (perPage: number) => {
  const { data } = await defaultAPI.get("/users/products?per_page=" + perPage);
  return data;
};
