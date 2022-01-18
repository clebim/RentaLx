import { injectable, inject } from 'tsyringe';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../helpers/domainResults/CreateUseCaseResults';
import {
  Either,
  IServiceError,
} from '../../../../helpers/domainResults/interfaces';
import { logger } from '../../../../helpers/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICreateCategoryDTO } from '../../interfaces/categories/ICreateCategory';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createUseCaseError({
      message: error.message,
      statusCode,
    });
  }

  async categoryAlreadyExists(category: string): Promise<boolean> {
    try {
      const { data } = await this.repository.findByName(category);

      return !!data;
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return false;
    }
  }

  async execute(
    createCategoryData: ICreateCategoryDTO,
  ): Promise<Either<Category, IServiceError>> {
    try {
      const { name } = createCategoryData;

      if (await this.categoryAlreadyExists(name)) {
        return this.buildError(
          { message: 'Category already registered on the platform' },
          400,
        );
      }

      const { data, isFailure, error } = await this.repository.create(
        createCategoryData,
      );

      if (isFailure) {
        return this.buildError(error, 400);
      }

      return createUseCaseSuccess<Category>(data);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
