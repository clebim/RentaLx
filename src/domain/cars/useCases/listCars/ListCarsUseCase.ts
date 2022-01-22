import { inject, injectable } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCaseBase } from '../../../../shared/base/UseCaseBase';
import { ICarsRepository } from '../../infra/contracts/ICarsRepository';
import { IListCarsDTO } from '../../interfaces/cars/IListCars';
import { IListCarsData } from '../../interfaces/cars/IListCarsData';

@injectable()
export class ListCarsUseCase extends UseCaseBase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {
    super();
  }

  public async execute(
    listCarsProps: IListCarsDTO,
  ): Promise<Either<IListCarsData, IUseCaseError>> {
    const { order, page, totalItemsPerPage, orderBy } = listCarsProps;

    const currentPage = page || 1;
    const currentTotalItemsPerPage = totalItemsPerPage || 30;
    const queryOrder = order || 'ASC';
    const orderByQuery = orderBy || 'name';

    try {
      const { data, isFailure, error } = await this.repository.list({
        ...listCarsProps,
        totalItemsPerPage: currentTotalItemsPerPage,
        page: currentPage,
        order: queryOrder,
        orderBy: orderByQuery,
      });

      if (isFailure) {
        return this.buildError({ message: error.message, statusCode: 400 });
      }

      const [cars, count] = data;

      const totalPages = Math.ceil(count / currentTotalItemsPerPage);

      const response: IListCarsData = {
        cars,
        totalItems: count,
        totalItemsPerPage: currentTotalItemsPerPage,
        page: currentPage,
        totalPages,
      };

      return this.buildSuccess<IListCarsData>(response);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
