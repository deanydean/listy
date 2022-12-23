export interface ApiResponse {
  data: object | null;
  error: {
    message: string;
  } | null;
  status: number | string;
}

export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DEL = 'DELETE',
}

export enum ContentType {
  APPLICATION_JSON = 'application/json',
}

export interface Headers {
  'content-type'?: ContentType;
}
