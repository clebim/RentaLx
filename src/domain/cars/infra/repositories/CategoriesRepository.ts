import { Either, IRepositoryError } from '../../../../common/domainResults';
import { createDomainResult } from '../../../../common/domainResults/CreateDomainResults';
import { logger } from '../../../../common/logger';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';
import { ICategoriesRepository } from '../contracts/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  private buildError(message: string) {
    return createDomainResult<Category, IRepositoryError>(
      {
        message,
      },
      true,
    );
  }

  create(
    createCategoryData: ICreateCategoryDTO,
  ): Either<Category, IRepositoryError> {
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
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error inserting category in database');
    }
  }
}
