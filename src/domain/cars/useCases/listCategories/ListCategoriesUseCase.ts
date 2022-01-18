import { injectable, inject } from 'tsyringe';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../helpers/domainResults/CreateServiceResults';
import {
  Either,
  IServiceError,
} from '../../../../helpers/domainResults/interfaces';
import { logger } from '../../../../helpers/logger';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { IListCategoriesData } from '../../interfaces/categories/IListCategoriesData';
import { IListCategoriesProps } from '../../interfaces/categories/IListCategoriesProps';

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

  async execute(
    listCategoriesProps: IListCategoriesProps,
  ): Promise<Either<IListCategoriesData, IServiceError>> {
    try {
      const { order, page, totalItemsPerPage } = listCategoriesProps;

      const currentPage = page || 1;
      const currentTotalItemsPerPage = totalItemsPerPage || 30;
      const queryOrder = order || 'ASC';

      const { data, isFailure, error } = await this.repository.list({
        ...listCategoriesProps,
        totalItemsPerPage: currentTotalItemsPerPage,
        page: currentPage,
        order: queryOrder,
      });

      if (isFailure) {
        return this.buildError(error, 400);
      }

      const [categories, count] = data;

      const totalPages = Math.ceil(count / currentTotalItemsPerPage);

      const response: IListCategoriesData = {
        categories,
        totalItems: count,
        totalItemsPerPage: currentTotalItemsPerPage,
        page: currentPage,
        totalPages,
      };

      return createServiceSuccess<IListCategoriesData>(response);
    } catch (error) {
      logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
