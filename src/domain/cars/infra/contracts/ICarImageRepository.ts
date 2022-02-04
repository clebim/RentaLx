import {
  Either,
  IRepositoryError,
} from '../../../../helpers/domainResults/interfaces';
import { ICreateCarImageDTO } from '../../interfaces/cars/ICreateCarImage';
import { CarImage } from '../typeorm/entities/CarImage';

export interface ICarImageRepository {
  createOrSave(
    createCarImageProps: ICreateCarImageDTO | CarImage,
  ): Promise<Either<IRepositoryError, CarImage>>;
}
