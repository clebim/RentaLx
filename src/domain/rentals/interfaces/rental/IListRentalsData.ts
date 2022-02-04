import { Rental } from '../../infra/typeorm/entities/Rental';

export interface IListCarsData {
  cars: Rental[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
