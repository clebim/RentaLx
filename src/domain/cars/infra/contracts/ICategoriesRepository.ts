import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';
import { IListCategoriesProps } from '../../interfaces/categories/IListCategoriesProps';
import { Category } from '../typeorm/entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<Category, IRepositoryError>>;
  list(
    listCategoryFilters: IListCategoriesProps,
  ): Promise<Either<[Category[], number], IRepositoryError>>;
  findByName(
    name: string,
  ): Promise<Either<Category | undefined, IRepositoryError>>;
}
