export interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectReturnDate: Date;
  startDate: Date;
}
