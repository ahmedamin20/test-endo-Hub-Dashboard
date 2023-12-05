import { defaultAPI } from "@/api/axios";
import { Setting } from "../interfaces/Settings";

export const getSettings = async () => {
  const { data } = await defaultAPI.get("/admin/settings");
  return data;
};

export const updateSettings = async (body: Setting) => {
  const { data } = await defaultAPI.put("/admin/settings", body);
  return data;
};
