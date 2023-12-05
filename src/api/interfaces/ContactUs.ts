import { Response } from "./Response";

export interface ContactUs {
  id: number;
  name: string;
  email: string;
  message: string;
  phone: string;
  status: boolean;
}

export type ContactUsResponse = Response<ContactUs[]>;
