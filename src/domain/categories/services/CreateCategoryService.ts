import { Either, IServiceError } from '../../../Common/domainResults';
import { createDomainResult } from '../../../Common/domainResults/CreateDomainResults';
import { logger } from '../../../Common/logger';
import { ICategoriesRepository } from '../infra/contracts/ICategoriesRepository';
import { Category } from '../infra/entities/Category';
import { ICreateCategoryDTO } from '../interfaces/ICreateCategory';

export class CreateCategoryService {
  constructor(private repository: ICategoriesRepository) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createDomainResult<Category, IServiceError>(
      {
        message: error.message,
        statusCode,
      },
      true,
    );
  }

  execute(
    createCategoryData: ICreateCategoryDTO,
  ): Either<Category, IServiceError> {
    try {
      const { value, isFailure, error } =
        this.repository.create(createCategoryData);

      if (isFailure) {
        this.buildError(error, 400);
      }

      return createDomainResult<Category, IServiceError>(value, false);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return this.buildError(error, 400);
    }
  }
}
