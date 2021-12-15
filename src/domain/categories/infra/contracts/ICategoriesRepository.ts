import {
  IDomainResult,
  IRepositoryError,
} from '../../../../Common/domainResults';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { Category } from '../entities/Category';

export interface ICategoriesRepository {
  create(
    createCategoryData: ICreateCategoryDTO,
  ): IDomainResult<Category, IRepositoryError>;
}
