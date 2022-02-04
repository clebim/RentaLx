import { inject, injectable } from 'tsyringe';

import { UseCase } from '../../../shared/base/UseCase';
import { IRentalRepository } from '../infra/typeorm/contracts/IRentalRepository';
import { ICreateRentalDTO } from '../interfaces/rental/ICreateRental';

@injectable()
export class CreateRentalUseCase extends UseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalRepository,
  ) {
    super();
  }

  async execute(createRental: ICreateRentalDTO): Promise<void> {}
}
