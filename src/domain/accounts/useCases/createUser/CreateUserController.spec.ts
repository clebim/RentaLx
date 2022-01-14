import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import { IServiceError } from '../../../../commonMethods/domainResults/interfaces';
import { User } from '../../infra/entities/User';
import { ICreateUserDTO } from '../../interfaces/user/ICreateUser';
import { createUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

jest.mock('./CreateUserUseCase');

const createUserMock = CreateUserUseCase as jest.MockedClass<
  typeof CreateUserUseCase
>;

const generateUserData = (): ICreateUserDTO => {
  return {
    name: faker.datatype.string(32),
    email: faker.internet.email(),
    driverLicense: faker.datatype.string(12),
    password: faker.internet.password(),
  };
};

const generateUserCreated = (): User => {
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

let createUserData: ICreateUserDTO;
let user: User;

describe('Test Create User Controller', () => {
  beforeEach(() => {
    createUserMock.prototype.execute.mockRestore();
    createUserData = generateUserData();
    user = generateUserCreated();
  });

  it('should response status code 200 when call createUser', async () => {
    const mockRequest = getMockReq({
      body: createUserData,
    });

    const { res, next } = getMockRes();

    delete user.password;

    const serviceSucess = createServiceSuccess<User>(user);

    createUserMock.prototype.execute.mockResolvedValue(serviceSucess);

    await createUserController(mockRequest, res, next);

    expect(createUserMock.prototype.execute).toBeCalledTimes(1);
    expect(createUserMock.prototype.execute).toBeCalledWith(createUserData);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(user);
    expect(next).toBeCalledTimes(0);
  });

  it('should response status code 400 when call createUser', async () => {
    const mockRequest = getMockReq({
      body: createUserData,
    });

    const { res, next } = getMockRes();

    const serviceErrorData: IServiceError = {
      message: 'Email already registered on the platform',
      statusCode: 400,
    };

    const serviceError = createServiceError(serviceErrorData);

    createUserMock.prototype.execute.mockResolvedValue(serviceError);

    await createUserController(mockRequest, res, next);

    expect(createUserMock.prototype.execute).toBeCalledTimes(1);
    expect(createUserMock.prototype.execute).toBeCalledWith(createUserData);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      message: serviceErrorData.message,
    });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const mockRequest = getMockReq({
      body: createUserData,
    });

    const { res, next } = getMockRes();

    createUserMock.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await createUserController(mockRequest, res, next);

    expect(createUserMock.prototype.execute).toBeCalledTimes(1);
    expect(createUserMock.prototype.execute).toBeCalledWith(createUserData);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});
