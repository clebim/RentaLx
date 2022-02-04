import { getRepository, Repository as TypeOrmRepository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { Repository } from '../../../../../shared/base/Repository';
import { ICreateCarDTO } from '../../../interfaces/cars/ICreateCar';
import { IListCarsDTO } from '../../../interfaces/cars/IListCars';
import { ICarsRepository } from '../../contracts/ICarsRepository';
import { Car } from '../entities/Car';

export class CarsRepository extends Repository implements ICarsRepository {
  private repository: TypeOrmRepository<Car>;

  constructor() {
    super('CarsRepository');
    this.repository = getRepository(Car);
  }

  async findById(id: string): Promise<Either<IRepositoryError, Car>> {
    try {
      const car = await this.repository.findOne(id);

      return this.right<Car | undefined>(car);
    } catch (error) {
      return this.left({
        error,
        message: 'Error in get car in database',
      });
    }
  }

  async createOrSave(
    createCarProps: ICreateCarDTO | Car,
  ): Promise<Either<IRepositoryError, Car>> {
    try {
      const car = this.repository.create(createCarProps);

      await this.repository.save(car);

      return this.right<Car>(car);
    } catch (error) {
      return this.left({
        error,
        message: 'Error in create or save a car in database',
      });
    }
  }

  async findByLicensePlate(
    licensePlate: string,
  ): Promise<Either<IRepositoryError, Car>> {
    try {
      const car = await this.repository.findOne({
        where: {
          licensePlate,
        },
      });

      return this.right<Car | undefined>(car);
    } catch (error) {
      return this.left({
        error,
        message: 'Error in get car in database',
      });
    }
  }

  async list(
    listCarsProps: IListCarsDTO,
  ): Promise<Either<IRepositoryError, [Car[], number]>> {
    const {
      available,
      totalItemsPerPage,
      categoryId,
      brand,
      maxDailyRate,
      minDailyRate,
      name,
      order,
      page,
      orderBy,
    } = listCarsProps;

    try {
      const query = this.repository
        .createQueryBuilder('cars')
        .where('cars.categoryId is not null');

      if (name) {
        query.andWhere('cars.name LIKE :name', { name: `%${name}%` });
      }

      if (available) {
        query.andWhere('cars.available = :available', { available });
      }

      if (categoryId) {
        query.andWhere('cars.categoryId = :categoryId', { categoryId });
      }

      if (brand) {
        query.andWhere('cars.brand LIKE :brand', { brand: `%${brand}%` });
      }

      if (minDailyRate) {
        query.andWhere('cars.dailyRate >= :minDailyRate', { minDailyRate });
      }

      if (maxDailyRate) {
        query.andWhere('cars.dailyRate <= :maxDailyRate', { maxDailyRate });
      }

      if (order && orderBy) {
        query.orderBy(`cars.${orderBy}`, order);
      }

      if (page && totalItemsPerPage) {
        query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
      }

      const responseQuery = await query.getManyAndCount();

      return this.right<[Car[], number]>(responseQuery);
    } catch (error) {
      console.log(error);
      return this.left({
        error,
        message: 'Error in get list cars in database',
      });
    }
  }
}
