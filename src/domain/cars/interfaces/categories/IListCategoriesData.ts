import { Category } from '../../infra/typeorm/entities/Category';

export interface IListCategoriesData {
  categories: Category[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
