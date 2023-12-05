import { defaultAPI } from "@/api/axios";

export const getTestimonials = async (
  page = 1,
  per_page = 5,
  handle?: string
) => {
  const { data } = await defaultAPI.get(
    `/admin/testimonials?handle=${handle}&per_page=${per_page}&page=${page}`
  );
  return data;
};

export const deleteTestimonial = async (id: number) => {
  const { data } = await defaultAPI.delete(`/admin/testimonials/${id}`);
  return data;
};
