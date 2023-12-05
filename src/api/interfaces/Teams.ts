import { Response } from "./Response";

export interface Member {
  id: number;
  name: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  teamMemberPhoto: any;
  section: Section;
}
export interface adType{
  id?:any,
title:string,
discount:string,
description:string,
image:any
}
interface Section {
  id: number;
  title: string;
}
export interface AdsType{
  id:number,
  title:string,
  description:string,
  disount:string,
  image:string
}

export type TeamsResponse = Response<Member[]>;
export type AdsResponse = Response<AdsType[]>;
export type MemberResponse = Response<Member>;
export type AdResponse = Response<adType>;
export type SectionResponse = Response<{title:string}>;
