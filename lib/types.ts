export interface ApiResponse<T = unknown> {
  statusCode: number;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface LocalizedType {
  en?: string;
  ar?: string;
}
