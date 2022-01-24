import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../../helpers/domainResults/CreateUseCaseResults';
import { IUseCaseError } from '../../../../../helpers/domainResults/interfaces';
import { Specification } from '../../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../../../interfaces/specifications/ICreateSpecification';
import { CreateSpecificationUseCase } from '../../../useCases/createSpecification/CreateSpecificationUseCase';
import { createSpecificationController } from './CreateSpecificationController';

jest.mock('../../../useCases/createSpecification/CreateSpecificationUseCase');

const createSpecificationMock = CreateSpecificationUseCase as jest.MockedClass<
  typeof CreateSpecificationUseCase
>;

describe('Create Specification Controller', () => {
  beforeEach(() => {
    createSpecificationMock.prototype.execute.mockRestore();
  });

  it('should response statusCode 201 when call createSpecification', async () => {
    const createSpecification: ICreateSpecificationDTO = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: createSpecification,
    });

    const { res, next } = getMockRes();

    const createSpecificationSuccess: Specification = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      cars: [],
      description: faker.datatype.string(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const serviceSucess = createUseCaseSuccess<Specification>(
      createSpecificationSuccess,
    );

    createSpecificationMock.prototype.execute.mockResolvedValue(serviceSucess);

    await createSpecificationController(mockRequest, res, next);

    expect(createSpecificationMock.prototype.execute).toBeCalledTimes(1);
    expect(createSpecificationMock.prototype.execute).toBeCalledWith(
      createSpecification,
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(createSpecificationSuccess);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call createSpecification', async () => {
    const createSpecification: ICreateSpecificationDTO = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: createSpecification,
    });

    const { res, next } = getMockRes();

    const createCategoryError: IUseCaseError = {
      message: 'Error inserting specification in database',
      statusCode: 400,
    };

    const serviceError = createUseCaseError(createCategoryError);

    createSpecificationMock.prototype.execute.mockResolvedValue(serviceError);

    await createSpecificationController(mockRequest, res, next);

    expect(createSpecificationMock.prototype.execute).toBeCalledTimes(1);
    expect(createSpecificationMock.prototype.execute).toBeCalledWith(
      createSpecification,
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: createCategoryError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const createSpecification: ICreateSpecificationDTO = {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: createSpecification,
    });

    const { res, next } = getMockRes();

    createSpecificationMock.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await createSpecificationController(mockRequest, res, next);

    expect(createSpecificationMock.prototype.execute).toBeCalledTimes(1);
    expect(createSpecificationMock.prototype.execute).toBeCalledWith(
      createSpecification,
    );
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});
