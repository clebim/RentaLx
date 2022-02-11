export interface IListRentalsDTO {
  carId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  expectedReturnDate?: string;
  page?: number;
  orderBy?: string;
  totalItemsPerPage?: number;
  order?: 'ASC' | 'DESC';
}
