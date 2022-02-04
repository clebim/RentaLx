import { getRepository, Repository as TypeOrmRepository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { Repository } from '../../../../../shared/base/Repository';
import { ICreateRentalDTO } from '../../../interfaces/rental/ICreateRental';
import { IListRentalsDTO } from '../../../interfaces/rental/IListRentals';
import { IRentalRepository } from '../contracts/IRentalRepository';
import { Rental } from '../entities/Rental';

export class RentalRepository extends Repository implements IRentalRepository {
  private repository: TypeOrmRepository<Rental>;

  constructor() {
    super('RentalRepository');
    this.repository = getRepository(Rental);
  }

  async list(
    listRentals: IListRentalsDTO,
  ): Promise<Either<IRepositoryError, [Rental[], number]>> {
    const {
      carId,
      endDate,
      expectedReturnDate,
      startDate,
      userId,
      order,
      orderBy,
      page,
      totalItemsPerPage,
    } = listRentals;

    try {
      const query = this.repository
        .createQueryBuilder('rentals')
        .where('rentals.id is not null');

      if (carId) {
        query.andWhere('rentals.carId = :carId', { carId });
      }

      if (userId) {
        query.andWhere('rentals.userId = :userId', { userId });
      }

      if (startDate) {
        query.andWhere('rentals.startDate >= :startDate', { startDate });
      }

      if (endDate) {
        query.andWhere('rentals.endDate <= :endDate', { endDate });
      }

      if (expectedReturnDate) {
        query.andWhere('rentals.expectedReturnDate = :expectedReturnDate', {
          expectedReturnDate,
        });
      }

      if (order && orderBy) {
        query.orderBy(`cars.${orderBy}`, order);
      }

      if (page && totalItemsPerPage) {
        query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
      }

      const responseQuery = await query.getManyAndCount();

      return this.right<[Rental[], number]>(responseQuery);
    } catch (error) {
      console.log(error);
      return this.left({
        error,
        message: 'Error in get list rentals in database',
      });
    }
  }

  async createOrSave(
    createRental: ICreateRentalDTO,
  ): Promise<Either<IRepositoryError, Rental>> {
    try {
      const rental = this.repository.create(createRental);

      await this.repository.save(rental);

      return this.right<Rental>(rental);
    } catch (error) {
      return this.left({
        error,
        message: 'Error in create or save a rental in database',
      });
    }
  }
}
