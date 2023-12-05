import { Response } from "./Response";

export interface AboutUs {
  name: string;
  description: string;
  youtube_video_url: string;
  image?: any;
}

export type AboutUsResponse = Response<AboutUs>;
