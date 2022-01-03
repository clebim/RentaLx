import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../commonMethods/domainResults/interfaces';
import { logger } from '../../../../commonMethods/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { Category } from '../../infra/entities/Category';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {}

  private buildError(error, statusCode: 400 | 404 | 409) {
    return createServiceError({
      message: error.message,
      statusCode,
    });
  }

  async execute(): Promise<Either<Category[], IServiceError>> {
    try {
      const { data, isFailure, error } = await this.repository.list();

      if (isFailure) {
        return this.buildError(error, 400);
      }

      return createServiceSuccess<Category[]>(data);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
