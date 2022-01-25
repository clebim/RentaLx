import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';
import { IListCategoriesDTO } from '../../interfaces/categories/IListCategories';
import { Category } from '../typeorm/entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<Category, IRepositoryError>>;
  list(
    listCategoryFilters: IListCategoriesDTO,
  ): Promise<Either<[Category[], number], IRepositoryError>>;
  findByName(
    name: string,
  ): Promise<Either<Category | undefined, IRepositoryError>>;
}
