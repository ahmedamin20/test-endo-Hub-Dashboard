import { Response } from "./Response";

export interface Setting {
  title: string;
  address: string;
  email: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  whatsapp: string;
  youtube: string;
  working_hours: string;
  phone: string;
}

export type SettingResponse = Response<Setting>;
