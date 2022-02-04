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
  ): Promise<Either<IRepositoryError, Category>>;
  list(
    listCategoryFilters: IListCategoriesDTO,
  ): Promise<Either<IRepositoryError, [Category[], number]>>;
  findByName(
    name: string,
  ): Promise<Either<IRepositoryError, Category | undefined>>;
}
