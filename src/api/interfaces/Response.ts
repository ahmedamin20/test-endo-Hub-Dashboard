export interface Response<Type> {
  data: Type;
  links: Links;
  meta: Meta;
  message: string;
  code: number;
  type: string;
}

export interface Links {
  first: string;
  last: string;
  next: string;
  prev: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
}
