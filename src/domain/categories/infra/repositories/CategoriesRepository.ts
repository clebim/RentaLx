import {
  IDomainResult,
  IRepositoryError,
} from '../../../../Common/domainResults';
import { createDomainResult } from '../../../../Common/domainResults/CreateDomainResults';
import { logger } from '../../../../Common/logger';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { ICategoriesRepository } from '../contracts/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create(
    createCategoryData: ICreateCategoryDTO,
  ): IDomainResult<Category, IRepositoryError> {
    try {
      const { name, description } = createCategoryData;

      const category = new Category();

      Object.assign(category, {
        name,
        description,
        createdAt: new Date(),
      });

      this.categories.push(category);
      return createDomainResult<Category, IRepositoryError>(category, false);
    } catch (error) {
      logger({
        type: 'RepositotyError',
        error,
      });
      return createDomainResult<Category, IRepositoryError>(
        {
          message: 'Error in create category',
        },
        true,
      );
    }
  }
}
