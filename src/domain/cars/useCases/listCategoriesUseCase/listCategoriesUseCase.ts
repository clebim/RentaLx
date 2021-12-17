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

export class ListCategoriesUseCase {
  constructor(private repository: ICategoriesRepository) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<Category>({
      message: error.message,
      statusCode,
    });
  }

  execute(): Either<Category[], IServiceError> {
    try {
      const { data, isFailure, error } = this.repository.list();

      if (isFailure) {
        this.buildError(error, 400);
      }

      return createServiceSuccess<Category[]>(data);
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
