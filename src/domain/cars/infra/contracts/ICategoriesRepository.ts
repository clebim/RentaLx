import { Either, IRepositoryError } from '../../../../common/domainResults';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): Either<Category, IRepositoryError>;
}
