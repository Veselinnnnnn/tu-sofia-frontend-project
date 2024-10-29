export interface PageableResponseModel<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
