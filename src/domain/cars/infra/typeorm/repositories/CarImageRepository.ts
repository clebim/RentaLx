import { getRepository, Repository as TypeOrmRepository } from 'typeorm';

import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { Repository } from '../../../../../shared/base/Repository';
import { ICreateCarImageDTO } from '../../../interfaces/cars/ICreateCarImage';
import { ICarImageRepository } from '../../contracts/ICarImageRepository';
import { CarImage } from '../entities/CarImage';

export class CarImageRepository
  extends Repository
  implements ICarImageRepository
{
  private repository: TypeOrmRepository<CarImage>;

  constructor() {
    super('CarImageRepository');
    this.repository = getRepository(CarImage);
  }

  async createOrSave(
    createCarImageProps: ICreateCarImageDTO | CarImage,
  ): Promise<Either<CarImage, IRepositoryError>> {
    try {
      const carImage = this.repository.create(createCarImageProps);

      await this.repository.save(carImage);

      return this.buildSuccess<CarImage>(carImage);
    } catch (error) {
      return this.buildError({
        error,
        message: 'Error in create or save a carImage in database',
      });
    }
  }
}
