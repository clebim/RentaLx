import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../common-methods/domainResults/CreateServiceResults';
import { getFileName } from '../../../../common-methods/domainResults/GetFileName';
import {
  Either,
  IServiceError,
} from '../../../../common-methods/domainResults/interfaces';
import { logger } from '../../../../common-methods/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { Category } from '../../infra/entities/Category';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError<Category>({
      message: error.message,
      statusCode,
    });
  }

  async execute(): Promise<Either<Category[], IServiceError>> {
    try {
      const { data, isFailure, error } = await this.repository.list();

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
