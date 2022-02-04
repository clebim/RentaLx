import {
  Either,
  IRepositoryError,
} from '../../../../../helpers/domainResults/interfaces';
import { ICreateRentalDTO } from '../../../interfaces/rental/ICreateRental';
import { IListRentalsDTO } from '../../../interfaces/rental/IListRentals';
import { Rental } from '../entities/Rental';

export interface IRentalRepository {
  list(
    listRentalsProps: IListRentalsDTO,
  ): Promise<Either<IRepositoryError, [Rental[], number]>>;
  createOrSave(
    createRentalProps: ICreateRentalDTO,
  ): Promise<Either<IRepositoryError, Rental>>;
}
