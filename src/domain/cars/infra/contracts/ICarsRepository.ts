import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateCarDTO } from '../../interfaces/cars/ICreateCar';
import { IListCarsDTO } from '../../interfaces/cars/IListCars';
import { Car } from '../typeorm/entities/Car';

export interface ICarsRepository {
  createOrSave(
    createCarProps: ICreateCarDTO | Car,
  ): Promise<Either<IRepositoryError, Car>>;
  findByLicensePlate(
    licensePlate: string,
  ): Promise<Either<IRepositoryError, Car | undefined>>;
  list(
    listCarsProps: IListCarsDTO,
  ): Promise<Either<IRepositoryError, [Car[], number]>>;
  findById(id: string): Promise<Either<IRepositoryError, Car | undefined>>;
}
