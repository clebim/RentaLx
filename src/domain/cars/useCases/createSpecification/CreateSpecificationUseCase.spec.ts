import faker from 'faker';

import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../../../commonMethods/domainResults/CreateRepositoryError';
import { IRepositoryError } from '../../../../commonMethods/domainResults/interfaces';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpeficicationsRepository';
import { ICreateSpecificationDTO } from '../../interfaces/specifications/ICreateSpecification';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const repository = new SpecificationsRepository();

let createSpecification: CreateSpecificationUseCase;

jest.mock('../../infra/repositories/SpeficicationsRepository');
const repositoryMock = SpecificationsRepository as jest.MockedClass<
  typeof SpecificationsRepository
>;

describe('Create Specification', () => {
  beforeEach(() => {
    createSpecification = new CreateSpecificationUseCase(repository);
    repositoryMock.prototype.create.mockRestore();
  });

  it('should able to create a new specification', async () => {
    const createUser: ICreateSpecificationDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    const repositoryData = {
      id: faker.datatype.uuid(),
      name: createUser.name,
      description: createUser.description,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const createSuccess =
      createRepositorySuccess<Specification>(repositoryData);

    repositoryMock.prototype.create.mockResolvedValue(createSuccess);

    const response = await createSpecification.execute(createUser);

    expect(response.data).toEqual(repositoryData);
    expect(response.isSuccess).toBe(true);
  });

  it('should not able to create a new specification because repository fatal error', async () => {
    const createUser: ICreateSpecificationDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    repositoryMock.prototype.create.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await createSpecification.execute(createUser);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });

  it('should not able to create a new specification because unknown error', async () => {
    const createUser: ICreateSpecificationDTO = {
      description: faker.datatype.string(),
      name: faker.datatype.string(),
    };

    const repositoryDataError: IRepositoryError = {
      message: 'Error inserting specification in database',
      repository: 'SpecificationsRepository',
    };

    const repositoryError = createRepositoryError(repositoryDataError);

    repositoryMock.prototype.create.mockResolvedValue(repositoryError);

    const response = await createSpecification.execute(createUser);

    expect(response.data).toBe(null);
    expect(response.isFailure).toBe(true);
    expect(response.error.message).toEqual(repositoryDataError.message);
    expect(response.error.statusCode).toEqual(400);
  });
});
