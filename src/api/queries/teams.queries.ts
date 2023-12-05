import { defaultAPI } from "@/api/axios";
import { Member } from "../interfaces/Teams";

export const getMembers = async (
  per_page?: number,
  page?: number,
  handle?: string
) => {
  const { data } = await defaultAPI.get(
    `/admin/our_team?handle=${handle}&per_page=${per_page}&page=${page}`
  );
  return data;
};
export const getMember = async (id: number) => {
  const { data } = await defaultAPI.get(`/admin/our_team/${id}`);
  return data;
};

export const addMember = async (body: Member) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]: any) => {
    if (key === "teamMemberPhoto") {
      if (value[0]?.file !== undefined) {
        // @ts-ignore
        formData.append("team_member", (value as FileList)[0].file);
        return;
      }
      return;
    }
    if (key === "section") {
      formData.append("section_id", value.id);
      return;
    }
    if (value) formData.append(key, value as string);
  });

  const { data } = await defaultAPI.post(`/admin/our_team`, formData);
  return data;
};

export const updateMember = async (id: number, body: Partial<any>) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]: any) => {
    if (key === "teamMemberPhoto") {
      if (value[0]?.file !== undefined) {
        // @ts-ignore
        formData.append("team_member", (value as FileList)[0].file);
        return;
      }
      return;
    }
    if (key === "section") {
      formData.append("section_id", value.id);
      return;
    }
    if (value) formData.append(key, value as string);
  });

  const { data } = await defaultAPI.post(`/admin/our_team/${id}`, formData);
  return data;
};

export const deleteMember = async (id: number) => {
  const { data } = await defaultAPI.delete(`/admin/our_team/${id}`);
  return data;
};
