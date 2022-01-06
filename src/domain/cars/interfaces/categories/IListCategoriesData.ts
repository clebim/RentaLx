import { Category } from '../../infra/entities/Category';

export interface IListCategoriesData {
  categories: Category[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
