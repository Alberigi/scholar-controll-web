export interface PagedSchoolDTO<T>
{
  total: number;
  page: number;
  pageSize: number;
  items: T[]
}
