import { defaultAPI } from "@/api/axios";

export const getAppointment = async (
  per_page?: number,
  page?: number,
  handle?: string
) => {
  const { data } = await defaultAPI.get(
    `/admin/appointments?handle=${handle}&per_page=${per_page}&page=${page}`
  );
  return data;
};
export const deleteAppointment = async (id: number) => {
  const { data } = await defaultAPI.delete(`/admin/appointments/${id}`);
  return data;
};
