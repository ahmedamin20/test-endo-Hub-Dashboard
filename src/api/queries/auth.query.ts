import { defaultAPI } from "@/api/axios";

export const login = async (email: string, password: string) => {
  const { data } = await defaultAPI.post("/auth/login/dashboard", {
    email,
    password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await defaultAPI.post("/auth/logout");
  return data;
};
