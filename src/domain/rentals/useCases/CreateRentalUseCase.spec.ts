import faker from 'faker';

import { createRepositorySuccess } from '../../../helpers/domainResults/CreateRepositoryResults';
import { Rental } from '../infra/typeorm/entities/Rental';
import { RentalRepository } from '../infra/typeorm/repositories/RentalRepository';
import { ICreateRentalDTO } from '../interfaces/rental/ICreateRental';
import { CreateRentalUseCase } from './CreateRentalUseCase';

jest.mock('../infra/typeorm/repositories/RentalRepository');
const repositoryMock = RentalRepository as jest.MockedClass<
  typeof RentalRepository
>;

let createRentalUseCase: CreateRentalUseCase;
let createRentalProps: ICreateRentalDTO;

describe('Create Rental UseCase', () => {
  beforeEach(() => {
    createRentalUseCase = new CreateRentalUseCase(new RentalRepository());
    createRentalProps = {
      carId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      expectReturnDate: faker.date.recent(),
      startDate: new Date(),
    };
    repositoryMock.prototype.list.mockRestore();
    repositoryMock.prototype.createOrSave.mockRestore();
  });

  it('should able to create a new rental', async () => {
    repositoryMock.prototype.list.mockResolvedValue(
      createRepositorySuccess<[Rental[], number]>([[], 0]),
    );

    await createRentalUseCase.execute(createRentalProps);
  });
});
