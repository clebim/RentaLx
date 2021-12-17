import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../common/domainResults/CreateRepositoryError';
import { getFileName } from '../../../../common/domainResults/GetFileName';
import {
  Either,
  IRepositoryError,
} from '../../../../common/domainResults/interfaces';
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
    return createRepositoryError<Category>({
      message,
      repository: getFileName().split('.')[0],
    });
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
      return createRepositorySuccess<Category>(category);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
        fileName: getFileName(),
      });
      return this.buildError('Error inserting category in database');
    }
  }
}
