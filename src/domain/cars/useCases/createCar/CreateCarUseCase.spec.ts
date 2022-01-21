import faker from 'faker';

import { createRepositorySuccess } from '../../../../helpers/domainResults/CreateRepositoryResults';
import { Car } from '../../infra/typeorm/entities/Car';
import { CarsRepository } from '../../infra/typeorm/repositories/CarsRepository';
import { ICreateCarDTO } from '../../interfaces/cars/ICreateCar';
import { CreateCarUseCase } from './CreateCarUseCase';

jest.mock('../../infra/typeorm/repositories/CarsRepository');
const repositoryMock = CarsRepository as jest.MockedClass<
  typeof CarsRepository
>;

const carsRepository = new CarsRepository();
let createCarUseCase: CreateCarUseCase;
let createCarProps: ICreateCarDTO;

describe('Create Car useCase', () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase(carsRepository);
    createCarProps = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      dailyRate: faker.datatype.number(100),
      brand: faker.datatype.string(),
      fineAmount: faker.datatype.number(60),
      licensePlate: faker.datatype.string(),
      categoryId: faker.datatype.uuid(),
    };
  });

  it('should able create a new car', async () => {
    const repositoryData = {
      id: faker.datatype.uuid(),
      available: true,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      ...createCarProps,
    } as Car;

    const findEmpty = createRepositorySuccess(undefined);
    const repositorySuccess = createRepositorySuccess(repositoryData);

    repositoryMock.prototype.findByLicensePlate.mockResolvedValue(findEmpty);
    repositoryMock.prototype.createOrSave.mockResolvedValue(repositorySuccess);

    const { data, isSuccess } = await createCarUseCase.execute(createCarProps);

    expect(repositoryMock.prototype.findByLicensePlate).toBeCalledTimes(1);
    expect(repositoryMock.prototype.createOrSave).toBeCalledTimes(1);
    expect(repositoryMock.prototype.findByLicensePlate).toBeCalledWith(
      createCarProps.licensePlate,
    );
    expect(repositoryMock.prototype.createOrSave).toBeCalledWith(
      createCarProps,
    );
    expect(isSuccess).toBeTruthy();
    expect(data.id).toEqual(repositoryData.id);
  });

  it('should not create a new car because licensePlate already registered in platform', async () => {
    const carMock = {
      id: faker.datatype.uuid(),
      available: true,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      ...createCarProps,
    } as Car;

    const findSuccess = createRepositorySuccess(carMock);
    repositoryMock.prototype.findByLicensePlate.mockResolvedValue(findSuccess);

    const { error, isFailure } = await createCarUseCase.execute(createCarProps);

    expect(repositoryMock.prototype.findByLicensePlate).toBeCalledTimes(1);
    expect(repositoryMock.prototype.createOrSave).toBeCalledTimes(0);
    expect(repositoryMock.prototype.findByLicensePlate).toBeCalledWith(
      createCarProps.licensePlate,
    );
    expect(isFailure).toBeTruthy();
    expect(error.statusCode).toEqual(400);
  });

  it('should not able to create a new car because repository fatal error', async () => {
    repositoryMock.prototype.createOrSave.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await createCarUseCase.execute(createCarProps);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });
});
