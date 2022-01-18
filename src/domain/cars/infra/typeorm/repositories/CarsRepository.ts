import { getRepository, Repository } from 'typeorm';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../../helpers/domainResults/CreateRepositoryError';
import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { logger } from '../../../../../helpers/logger';
import { ICreateCarDTO } from '../../../interfaces/cars/ICreateCar';
import { ICarsRepository } from '../../contracts/ICarsRepository';
import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  private buildError(message: string) {
    return createRepositoryError({
      message,
      repository: 'CarsRepository',
    });
  }

  async createOrSave(
    createCarProps: ICreateCarDTO,
  ): Promise<Either<Car, IRepositoryError>> {
    try {
      const car = this.repository.create(createCarProps);

      await this.repository.save(car);

      return createRepositorySuccess<Car>(car);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error in create or save a car in database');
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

      return createRepositorySuccess<Car | undefined>(car);
    } catch (error) {
      logger({
        type: 'DatabaseError',
        error,
      });
      return this.buildError('Error in get car in database');
    }
  }
}
