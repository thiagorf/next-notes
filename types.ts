export interface ApiResponse<T> {
  data: T | T[];
  message: string;
}
