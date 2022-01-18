import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateCarDTO } from '../../interfaces/cars/ICreateCar';
import { Car } from '../typeorm/entities/Car';

export interface ICarsRepository {
  createOrSave(
    createCarProps: ICreateCarDTO,
  ): Promise<Either<Car, IRepositoryError>>;
  findByLicensePlate(
    licensePlate: string,
  ): Promise<Either<Car | undefined, IRepositoryError>>;
}
