import { defaultAPI } from "@/api/axios";
import { Appointment } from "../interfaces/Appointment";

export const appointment = async (body: Appointment) => {
  const { data } = await defaultAPI.post("/users/appointments", body);
  return data;
};
