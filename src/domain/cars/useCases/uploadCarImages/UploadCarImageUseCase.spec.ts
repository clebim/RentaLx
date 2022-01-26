import faker from 'faker';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../helpers/domainResults/CreateRepositoryResults';
import { Car } from '../../infra/typeorm/entities/Car';
import { CarImageRepository } from '../../infra/typeorm/repositories/CarImageRepository';
import { CarsRepository } from '../../infra/typeorm/repositories/CarsRepository';
import { ICreateCarImageDTO } from '../../interfaces/cars/ICreateCarImage';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

const carImageRepositoryMock = CarImageRepository as jest.MockedClass<
  typeof CarImageRepository
>;

const carsRepositoryMock = CarsRepository as jest.MockedClass<
  typeof CarsRepository
>;

jest.mock('../../infra/typeorm/repositories/CarImageRepository');
jest.mock('../../infra/typeorm/repositories/CarsRepository');

let uploadCarImageUseCase: UploadCarImageUseCase;
let createCarImageProps: ICreateCarImageDTO;

describe('Upload car image useCase', () => {
  beforeEach(() => {
    uploadCarImageUseCase = new UploadCarImageUseCase(
      new CarImageRepository(),
      new CarsRepository(),
    );
    createCarImageProps = {
      carId: faker.datatype.uuid(),
      imageName: faker.datatype.string(64),
    };
    carImageRepositoryMock.prototype.createOrSave.mockRestore();
    carsRepositoryMock.prototype.findById.mockRestore();
  });

  it('should able a upload car image', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(JSON.parse(faker.datatype.json())),
    );

    carImageRepositoryMock.prototype.createOrSave.mockResolvedValue(
      createRepositorySuccess({
        carId: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
        imageName: faker.datatype.string(64),
        car: {} as Car,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      }),
    );

    const { isSuccess } = await uploadCarImageUseCase.execute(
      createCarImageProps,
    );

    expect(isSuccess).toBeTruthy();
    expect(carImageRepositoryMock.prototype.createOrSave).toBeCalledTimes(1);
    expect(carImageRepositoryMock.prototype.createOrSave).toBeCalledWith(
      createCarImageProps,
    );
    expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.findById).toBeCalledWith(
      createCarImageProps.carId,
    );
  });

  it('should not able a upload car image because car not exists', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(undefined),
    );

    const { isSuccess, isFailure, error } = await uploadCarImageUseCase.execute(
      createCarImageProps,
    );

    expect(isSuccess).not.toBeTruthy();
    expect(isFailure).toBeTruthy();
    expect(carImageRepositoryMock.prototype.createOrSave).toBeCalledTimes(0);
    expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.findById).toBeCalledWith(
      createCarImageProps.carId,
    );
    expect(error.statusCode).toBe(400);
  });

  it('should not able a upload car image because fatal Error', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(JSON.parse(faker.datatype.json())),
    );

    carImageRepositoryMock.prototype.createOrSave.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await uploadCarImageUseCase.execute(createCarImageProps);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });

  it('should not able a upload car image because unknow Error', async () => {
    carsRepositoryMock.prototype.findById.mockResolvedValue(
      createRepositorySuccess(JSON.parse(faker.datatype.json())),
    );

    carImageRepositoryMock.prototype.createOrSave.mockResolvedValue(
      createRepositoryError({
        message: 'Error in register data in database',
        repository: 'CarImageRepository',
      }),
    );

    const { isSuccess, isFailure, error } = await uploadCarImageUseCase.execute(
      createCarImageProps,
    );

    expect(isSuccess).not.toBeTruthy();
    expect(isFailure).toBeTruthy();
    expect(carImageRepositoryMock.prototype.createOrSave).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.findById).toBeCalledTimes(1);
    expect(carsRepositoryMock.prototype.findById).toBeCalledWith(
      createCarImageProps.carId,
    );
    expect(error.statusCode).toBe(400);
  });
});
