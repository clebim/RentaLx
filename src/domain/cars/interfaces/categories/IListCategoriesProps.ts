export interface IListCategoriesProps {
  name?: string;
  description?: string;
  page: number;
  totalItemsPerPage: number;
  order: 'ASC' | 'DESC';
}
