interface Option {
  id?: number;
  label: string;
  value: string;
}
interface ResponseAPI<T> {
  error: T;
  status_code: number;
  message: string;
  data: T;
}
interface ErrorResponse<T> {
  message: string;
  errors: T;
  status_code: number;
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
}
