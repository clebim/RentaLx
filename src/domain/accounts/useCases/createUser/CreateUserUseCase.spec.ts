import faker from 'faker';

import { createRepositorySuccess } from '../../../../commonMethods/domainResults/CreateRepositoryError';
import { User } from '../../infra/typeorm/entities/User';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';
import { CreateUserUseCase } from './CreateUserUseCase';

const repository = new UsersRepository();

jest.mock('../../infra/typeorm/repositories/UsersRepository');
const repositoryMock = UsersRepository as jest.MockedClass<
  typeof UsersRepository
>;

const generateUserData = (): ICreateUserDTO => {
  return {
    name: faker.datatype.string(32),
    email: faker.internet.email(),
    driverLicense: faker.datatype.string(12),
    password: faker.internet.password(),
  };
};

const generateUserFound = (): User => {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(32),
    email: faker.internet.email(),
    driverLicense: faker.datatype.string(12),
    password: faker.internet.password(),
    isAdmin: false,
    avatarUrl: null,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    generatePasswordHash: () => {},
  };
};

let createUser: CreateUserUseCase;
let createUserData: ICreateUserDTO;
let userFound: User;

describe('Test Create user UseCase', () => {
  beforeEach(() => {
    createUser = new CreateUserUseCase(repository);
    createUserData = generateUserData();
    userFound = generateUserFound();
    repositoryMock.prototype.findByEmail.mockRestore();
    repositoryMock.prototype.createOrSave.mockRestore();
  });

  it('should able to create a new user', async () => {
    const userCreated: User = {
      ...createUserData,
      id: faker.datatype.uuid(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
      generatePasswordHash: () => {},
    };

    const findUserRepositorySuccess =
      createRepositorySuccess<undefined>(undefined);

    repositoryMock.prototype.findByEmail.mockResolvedValue(
      findUserRepositorySuccess,
    );

    const createUserRepositorySuccess =
      createRepositorySuccess<User>(userCreated);

    repositoryMock.prototype.createOrSave.mockResolvedValue(
      createUserRepositorySuccess,
    );

    const { data, isSuccess } = await createUser.execute(createUserData);

    expect(repositoryMock.prototype.findByEmail).toBeCalledTimes(1);
    expect(repositoryMock.prototype.createOrSave).toBeCalledTimes(1);
    expect(repositoryMock.prototype.createOrSave).toBeCalledWith(
      createUserData,
    );
    expect(isSuccess).toBe(true);
    expect(data).toHaveProperty('id');
    expect(data).not.toHaveProperty('password');
  });

  it('should not able to create a new user because email already exists', async () => {
    const userFoundRepositorySuccess = createRepositorySuccess<User>(userFound);

    repositoryMock.prototype.findByEmail.mockResolvedValue(
      userFoundRepositorySuccess,
    );

    const { error, isFailure } = await createUser.execute(createUserData);

    expect(repositoryMock.prototype.findByEmail).toBeCalledTimes(1);
    expect(repositoryMock.prototype.createOrSave).toBeCalledTimes(0);
    expect(isFailure).toBe(true);
    expect(error.message).toBe('Email already registered on the platform');
    expect(error.statusCode).toBe(400);
  });

  it('should not able to create a new user because repository fatal error', async () => {
    repositoryMock.prototype.createOrSave.mockRejectedValue(
      new Error('fatal error in database'),
    );

    try {
      await createUser.execute(createUserData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('fatal error in database');
    }
  });
});
