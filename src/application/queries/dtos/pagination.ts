export interface Pagination<T> {
  page: number;
  pageSize: number;
  data: T[];
  hasNextPage: boolean;
  totalItems: number;
}
