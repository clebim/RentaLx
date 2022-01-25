import faker from 'faker';

import { createRepositorySuccess } from '../../../../helpers/domainResults/CreateRepositoryResults';
import { Car } from '../../infra/typeorm/entities/Car';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { CarsRepository } from '../../infra/typeorm/repositories/CarsRepository';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpeficicationsRepository';
import { ICreateCarSpecificationDTO } from '../../interfaces/carsSpecification/ICreateCarSpecification';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecification: CreateCarSpecificationUseCase;
let createCarSpecificationProps: ICreateCarSpecificationDTO;
let carFound: Car;

const carsRepositoryMock = CarsRepository as jest.MockedClass<
  typeof CarsRepository
>;

const specificationsRepositoryMock =
  SpecificationsRepository as jest.MockedClass<typeof SpecificationsRepository>;

jest.mock('../../infra/typeorm/repositories/CarsRepository');
jest.mock('../../infra/typeorm/repositories/SpeficicationsRepository');

const generateCar = (): Car => {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
    available: faker.datatype.boolean(),
    categoryId: faker.datatype.uuid(),
    brand: faker.datatype.string(),
    dailyRate: faker.datatype.number(),
    fineAmount: faker.datatype.number(),
    licensePlate: faker.datatype.string(),
    category: {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    },
    specifications: [],
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  };
};

describe('Create Car Specification', () => {
  beforeEach(() => {
    createCarSpecification = new CreateCarSpecificationUseCase(
      new CarsRepository(),
      new SpecificationsRepository(),
    );
    createCarSpecificationProps = {
      carId: faker.datatype.uuid(),
      specificationsId: [faker.datatype.uuid(), faker.datatype.uuid()],
    };
    carFound = generateCar();
    carsRepositoryMock.prototype.createOrSave.mockRestore();
    carsRepositoryMock.prototype.findById.mockRestore();
    specificationsRepositoryMock.prototype.findByIds.mockRestore();
  });

  it('should able create a new car speficication', async () => {
    const specificationsFound: Specification[] = [
      {
        id: faker.datatype.uuid(),
        name: faker.datatype.string(64),
        description: faker.datatype.string(64),
        cars: [],
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
      {
        id: faker.datatype.uuid(),
        name: faker.datatype.string(64),
        description: faker.datatype.string(64),
        cars: [],
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
    ];

    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(carFound),
    );

    specificationsRepositoryMock.prototype.findByIds.mockResolvedValue(
      createRepositorySuccess(specificationsFound),
    );

    carsRepositoryMock.prototype.createOrSave.mockResolvedValue(
      createRepositorySuccess({
        ...carFound,
        specifications: specificationsFound,
      }),
    );

    const { isSuccess, data } = await createCarSpecification.execute(
      createCarSpecificationProps,
    );

    expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.createOrSave).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.createOrSave).toBeCalledWith({
      ...carFound,
      specifications: specificationsFound,
    });
    expect(specificationsRepositoryMock.prototype.findByIds).toBeCalledTimes(1);
    expect(specificationsRepositoryMock.prototype.findByIds).toBeCalledWith(
      createCarSpecificationProps.specificationsId,
    );
    expect(isSuccess).toBeTruthy();
    expect(data.specifications).toHaveLength(2);
  });

  it('should not able to create a carSpecification because car not exists', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(undefined),
    );

    const { isFailure, data, error } = await createCarSpecification.execute(
      createCarSpecificationProps,
    );

    expect(isFailure).toBeTruthy();
    expect(data).toBeNull();
    expect(error.statusCode).toBe(400);
    expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.createOrSave).not.toBeCalled();
    expect(specificationsRepositoryMock.prototype.findByIds).not.toBeCalled();
  });

  it('should not able to create a carSpecification because specifications not exists', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(carFound),
    );

    specificationsRepositoryMock.prototype.findByIds.mockResolvedValue(
      createRepositorySuccess([]),
    );

    const { isFailure, data, error } = await createCarSpecification.execute(
      createCarSpecificationProps,
    );

    expect(isFailure).toBeTruthy();
    expect(data).toBeNull();
    expect(error.statusCode).toBe(400);
    expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
    expect(specificationsRepositoryMock.prototype.findByIds).toBeCalledTimes(1);
    expect(specificationsRepositoryMock.prototype.findByIds).toBeCalledWith(
      createCarSpecificationProps.specificationsId,
    );
    expect(carsRepositoryMock.prototype.createOrSave).not.toBeCalled();
  });

  it('should not able to create a carSpecification because fatal error', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(carFound),
    );

    specificationsRepositoryMock.prototype.findByIds.mockResolvedValue(
      createRepositorySuccess(undefined),
    );

    try {
      await createCarSpecification.execute(createCarSpecificationProps);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
      expect(specificationsRepositoryMock.prototype.findByIds).toBeCalledTimes(
        1,
      );
      expect(specificationsRepositoryMock.prototype.findByIds).toBeCalledWith(
        createCarSpecificationProps.specificationsId,
      );
      expect(carsRepositoryMock.prototype.createOrSave).not.toBeCalled();
    }
  });
});
