import { injectable, inject } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { ICategoriesRepository } from '../../infra/contracts/ICategoriesRepository';
import { IListCategoriesDTO } from '../../interfaces/categories/IListCategories';
import { IListCategoriesData } from '../../interfaces/categories/IListCategoriesData';

@injectable()
export class ListCategoriesUseCase extends UseCase {
  constructor(
    @inject('CategoriesRepository')
    private repository: ICategoriesRepository,
  ) {
    super();
  }

  async execute(
    listCategoriesProps: IListCategoriesDTO,
  ): Promise<Either<IUseCaseError, IListCategoriesData>> {
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
        return this.left({ message: error.message, statusCode: 400 });
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

      return this.right<IListCategoriesData>(response);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
