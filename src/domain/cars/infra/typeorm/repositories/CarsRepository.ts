import { getRepository, Repository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { RepositoryBase } from '../../../../../shared/base/RepositoryBase';
import { ICreateCarDTO } from '../../../interfaces/cars/ICreateCar';
import { IListCarsDTO } from '../../../interfaces/cars/IListCars';
import { ICarsRepository } from '../../contracts/ICarsRepository';
import { Car } from '../entities/Car';

export class CarsRepository extends RepositoryBase implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    super('CarsRepository');
    this.repository = getRepository(Car);
  }

  async findById(id: string): Promise<Either<Car, IRepositoryError>> {
    try {
      const car = await this.repository.findOne(id);

      return this.buildSuccess<Car | undefined>(car);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error in get car in database',
      });
    }
  }

  async createOrSave(
    createCarProps: ICreateCarDTO | Car,
  ): Promise<Either<Car, IRepositoryError>> {
    try {
      const car = this.repository.create(createCarProps);

      await this.repository.save(car);

      return this.buildSuccess<Car>(car);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error in create or save a car in database',
      });
    }
  }

  async findByLicensePlate(
    licensePlate: string,
  ): Promise<Either<Car, IRepositoryError>> {
    try {
      const car = await this.repository.findOne({
        where: {
          licensePlate,
        },
      });

      return this.buildSuccess<Car | undefined>(car);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error in get car in database',
      });
    }
  }

  async list(
    listCarsProps: IListCarsDTO,
  ): Promise<Either<[Car[], number], IRepositoryError>> {
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

      return this.buildSuccess<[Car[], number]>(responseQuery);
    } catch (error) {
      console.log(error);
      return this.buildError({
        error,
        message: 'Error in get list cars in database',
      });
    }
  }
}
