import { Response } from "./Response";

export interface Appointment {
  id: number;
  name: string;
  email: string;
  date: string;
  message: string;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export type AppointmentResponse = Response<Appointment[]>;
