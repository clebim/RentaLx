import { hashSync } from 'bcrypt';
import faker from 'faker';

import { createRepositorySuccess } from '../../../../commonMethods/domainResults/CreateRepositoryError';
import { User } from '../../infra/typeorm/entities/User';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';
import { CreateSessionUseCase } from './CreateSessionUseCase';

const repository = new UsersRepository();

let createSession: CreateSessionUseCase;

jest.mock('../../infra/typeorm/repositories/UsersRepository');
const repositoryMock = UsersRepository as jest.MockedClass<
  typeof UsersRepository
>;

const userPassword = faker.internet.password();

let userFound: User;

describe('Create Session useCase', () => {
  beforeEach(() => {
    createSession = new CreateSessionUseCase(repository);
    repositoryMock.prototype.findByEmail.mockRestore();
    userFound = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      email: faker.internet.email(),
      password: hashSync(userPassword, 8),
      isAdmin: false,
      driverLicense: faker.datatype.string(12),
      avatarUrl: faker.internet.avatar(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      generatePasswordHash: () => {},
    };
  });

  it('should able to create a new session', async () => {
    const userSession = {
      email: userFound.email,
      password: userPassword,
    };

    const repositorySuccess = createRepositorySuccess<User>(userFound);

    repositoryMock.prototype.findByEmail.mockResolvedValue(repositorySuccess);

    const { data, isSuccess } = await createSession.execute(userSession);

    expect(isSuccess).toEqual(true);
    expect(data).toHaveProperty('accessToken');
    expect(repositoryMock.prototype.findByEmail).toBeCalledTimes(1);
    expect(repositoryMock.prototype.findByEmail).toBeCalledWith(
      userSession.email,
      true,
    );
  });

  it('should get a error in create Session because wrong email', async () => {
    const userSession = {
      email: faker.internet.email(),
      password: userPassword,
    };

    const repositorySuccess = createRepositorySuccess<User>(undefined);

    repositoryMock.prototype.findByEmail.mockResolvedValue(repositorySuccess);

    const { data, error, isFailure } = await createSession.execute(userSession);

    expect(isFailure).toEqual(true);
    expect(data).not.toBeTruthy();
    expect(error.message).toEqual('Email or password incorrect!');
    expect(error.statusCode).toEqual(400);
    expect(repositoryMock.prototype.findByEmail).toBeCalledWith(
      userSession.email,
      true,
    );
  });

  it('should get a error in create Session because wrong password', async () => {
    const userSession = {
      email: userFound.email,
      password: faker.internet.password(),
    };

    const repositorySuccess = createRepositorySuccess<User>(userFound);

    repositoryMock.prototype.findByEmail.mockResolvedValue(repositorySuccess);

    const { data, error, isFailure } = await createSession.execute(userSession);

    expect(isFailure).toEqual(true);
    expect(data).not.toBeTruthy();
    expect(error.message).toEqual('Email or password incorrect!');
    expect(error.statusCode).toEqual(400);
    expect(repositoryMock.prototype.findByEmail).toBeCalledWith(
      userSession.email,
      true,
    );
  });
});
