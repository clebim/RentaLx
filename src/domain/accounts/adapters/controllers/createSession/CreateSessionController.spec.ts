import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../../helpers/domainResults/CreateUseCaseResults';
import { IUseCaseError } from '../../../../../helpers/domainResults/interfaces';
import { ICreateSessionDTO } from '../../../interfaces/session/ICreateSession';
import { ICreateSessionSuccess } from '../../../interfaces/session/ICreateSessionSuccess';
import { CreateSessionUseCase } from '../../../useCases/createSession/CreateSessionUseCase';
import { createSessionController } from './CreateSessionController';

jest.mock('../../../useCases/createSession/CreateSessionUseCase');

const createSessionMock = CreateSessionUseCase as jest.MockedClass<
  typeof CreateSessionUseCase
>;

describe('Create Session Controller', () => {
  beforeEach(() => {
    createSessionMock.prototype.execute.mockRestore();
  });

  it('should response status code 200 when call createSession', async () => {
    const createSessionData: ICreateSessionDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockRequest = getMockReq({
      body: createSessionData,
    });

    const { res, next } = getMockRes();

    const createSessionSuccess = {
      user: JSON.parse(faker.datatype.json()),
      accessToken: faker.datatype.string(),
    };

    const serviceSucess =
      createUseCaseSuccess<ICreateSessionSuccess>(createSessionSuccess);

    createSessionMock.prototype.execute.mockResolvedValue(serviceSucess);

    await createSessionController(mockRequest, res, next);

    expect(createSessionMock.prototype.execute).toBeCalledTimes(1);
    expect(createSessionMock.prototype.execute).toBeCalledWith(
      createSessionData,
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(createSessionSuccess);
    expect(next).toBeCalledTimes(0);
  });

  it('should response statusCode 400 when call createSession', async () => {
    const createSessionData: ICreateSessionDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockRequest = getMockReq({
      body: createSessionData,
    });

    const { res, next } = getMockRes();

    const createSessionError: IUseCaseError = {
      message: 'Email or password incorrect!',
      statusCode: 400,
    };

    const serviceError = createUseCaseError(createSessionError);

    createSessionMock.prototype.execute.mockResolvedValue(serviceError);

    await createSessionController(mockRequest, res, next);

    expect(createSessionMock.prototype.execute).toBeCalledTimes(1);
    expect(createSessionMock.prototype.execute).toBeCalledWith(
      createSessionData,
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: createSessionError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const createSessionData: ICreateSessionDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockRequest = getMockReq({
      body: createSessionData,
    });

    const { res, next } = getMockRes();

    createSessionMock.prototype.execute.mockRejectedValue(
      new Error('fatal error'),
    );

    await createSessionController(mockRequest, res, next);

    expect(createSessionMock.prototype.execute).toBeCalledTimes(1);
    expect(createSessionMock.prototype.execute).toBeCalledWith(
      createSessionData,
    );
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});
