import { getRepository, Repository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { RepositoryBase } from '../../../../../shared/base/RepositoryBase';
import { ICreateCarDTO } from '../../../interfaces/cars/ICreateCar';
import { ICarsRepository } from '../../contracts/ICarsRepository';
import { Car } from '../entities/Car';

export class CarsRepository extends RepositoryBase implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    super('CarsRepository');
    this.repository = getRepository(Car);
  }

  async createOrSave(
    createCarProps: ICreateCarDTO,
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
}
