import { defaultAPI } from "../axios";

export const getServices = async (page = 1) => {
  const { data } = await defaultAPI.get(`/users/categories?page=${page}`);
  return data;
};
