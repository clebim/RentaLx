import {
  Either,
  IRepositoryError,
} from '../../../../commonMethods/domainResults/interfaces';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<Category, IRepositoryError>>;
  list(): Promise<Either<Category[], IRepositoryError>>;
  findByName(name: string): Promise<Either<Category, IRepositoryError>>;
}
