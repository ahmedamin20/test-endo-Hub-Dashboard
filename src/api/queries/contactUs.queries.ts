import { defaultAPI } from "@/api/axios";
import { ContactUs } from "../interfaces/ContactUs";

export const contact = async (
  per_page?: number,
  page?: number,
  handle?: string
) => {
  const { data } = await defaultAPI.get(
    `/admin/contact_us?handle=${handle}&per_page=${per_page}&page=${page}`
  );
  return data;
};
export const deleteContact = async (id: number) => {
  const { data } = await defaultAPI.delete(`/admin/contact_us/${id}`);
  return data;
};
export const changeStatus = async (id: number) => {
  const { data } = await defaultAPI.patch(`/admin/contact_us/${id}`);
  return data;
};
