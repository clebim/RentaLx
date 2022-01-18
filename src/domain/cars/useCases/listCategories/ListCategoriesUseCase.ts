import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { IListCategoriesData } from '../../interfaces/categories/IListCategoriesData';
import { IListCategoriesProps } from '../../interfaces/categories/IListCategoriesProps';

@injectable()
export class ListCategoriesUseCase extends UseCaseBase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {
    super();
  }

  async execute(
    listCategoriesProps: IListCategoriesProps,
  ): Promise<Either<IListCategoriesData, IUseCaseError>> {
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
        return this.buildError({ message: error.message, statusCode: 400 });
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

      return this.buildSuccess<IListCategoriesData>(response);
    } catch (error) {
      this.logger({
        error,
        type: 'DefaultError',
      });
      return error;
    }
  }
}
