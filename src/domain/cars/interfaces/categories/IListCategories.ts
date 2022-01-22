export interface IListCategoriesDTO {
  name?: string;
  description?: string;
  page?: number;
  totalItemsPerPage?: number;
  order?: 'ASC' | 'DESC';
}
