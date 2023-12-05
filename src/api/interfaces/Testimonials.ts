import { Response } from "./Response";

export interface Testimonials {
  id: number;
  name: string;
  content: string;
  avatar: string;
}

export type TestimonialsResponse = Response<Testimonials[]>;
