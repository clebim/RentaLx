import { Either, IRepositoryError } from '../../../../Common/domainResults';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): Either<Category, IRepositoryError>;
}
