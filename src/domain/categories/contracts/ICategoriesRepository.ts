import { Category } from '../entities/Category';
import { ICreateCategoryDTO } from '../interfaces/ICreateCategory';

export interface ICategoriesRepository {
  create(createCategoryData: ICreateCategoryDTO): Category;
}
