import { Car } from '../../infra/typeorm/entities/Car';

export interface IListCarsData {
  cars: Car[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}
