import {
  Either,
  IRepositoryError,
} from '../../../../common/domainResults/interfaces';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<Category, IRepositoryError>>;
  list(): Promise<Either<Category[], IRepositoryError>>;
  findByName(name: string): Promise<Either<Category[], IRepositoryError>>;
}
