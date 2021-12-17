import {
  createServiceError,
  createServiceSuccess,
} from '../../../../common/domainResults/CreateServiceResults';
import { getFileName } from '../../../../common/domainResults/GetFileName';
import {
  Either,
  IServiceError,
} from '../../../../common/domainResults/interfaces';
import { logger } from '../../../../common/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { Category } from '../../infra/entities/Category';
import { ICreateCategoryDTO } from '../../interfaces/ICreateCategory';

export class CreateCategoryUseCase {
  constructor(private repository: ICategoriesRepository) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<Category>({
      message: error.message,
      statusCode,
    });
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

      return createServiceSuccess<Category>(value);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
        fileName: getFileName(),
      });
      return error;
    }
  }
}
