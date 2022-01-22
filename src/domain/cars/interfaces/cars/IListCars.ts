export interface IListCarsDTO {
  name?: string;
  minDailyRate?: number;
  maxDailyRate?: number;
  available?: boolean;
  brand?: string;
  categoryId?: string;
  page?: number;
  orderBy?: string;
  totalItemsPerPage?: number;
  order?: 'ASC' | 'DESC';
}
