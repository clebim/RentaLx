import { inject, injectable } from 'tsyringe';

import {
  Either,
  IUseCaseError,
} from '../../../../helpers/domainResults/interfaces';
import { UseCase } from '../../../../shared/base/UseCase';
import { ICarsRepository } from '../../infra/contracts/ICarsRepository';
import { IListCarsDTO } from '../../interfaces/cars/IListCars';
import { IListCarsData } from '../../interfaces/cars/IListCarsData';

@injectable()
export class ListCarsUseCase extends UseCase {
  constructor(
    @inject('CarsRepository')
    private repository: ICarsRepository,
  ) {
    super();
  }

  public async execute(
    listCarsProps: IListCarsDTO,
  ): Promise<Either<IUseCaseError, IListCarsData>> {
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
        return this.left({ message: error.message, statusCode: 400 });
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

      return this.right<IListCarsData>(response);
    } catch (error) {
      this.logger({
        error,
        type: 'FatalError',
      });
      return error;
    }
  }
}
