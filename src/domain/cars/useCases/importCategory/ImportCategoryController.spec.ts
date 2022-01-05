import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { resolve } from 'path';

import {
  createServiceError,
  createServiceSuccess,
} from '../../../../commonMethods/domainResults/CreateServiceResults';
import { IServiceError } from '../../../../commonMethods/domainResults/interfaces';
import { MockCsv } from '../../../../shared/mocks/csv.mock';
import { Category } from '../../infra/entities/Category';
import { importCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const fakeString = (index: number) => `NameOrDescription${index}`;

const generateCvsData = (): string[] => {
  const auxArray = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const stringData = `${fakeString(i)},${fakeString(i)}`;

    auxArray.push(stringData);
  }

  return auxArray;
};

jest.mock('./ImportCategoryUseCase');

const importCategoryMock = ImportCategoryUseCase as jest.MockedClass<
  typeof ImportCategoryUseCase
>;

const path = resolve(__dirname);

describe('Import Category Controller', () => {
  beforeEach(() => {
    importCategoryMock.prototype.execute.mockRestore();
  });

  it('should response statusCode 204 when call ImportCategory', async () => {
    const csvData = generateCvsData();

    const mockCsvClass = new MockCsv();

    const file = await mockCsvClass.mockCsv(`${path}/teste.csv`, csvData);

    const mockRequest = getMockReq({
      file,
    });

    const { res, next } = getMockRes();

    const serviceSucess = createServiceSuccess<null>(null);

    importCategoryMock.prototype.execute.mockResolvedValue(serviceSucess);

    await importCategoryController(mockRequest, res, next);

    await mockCsvClass.deleteCsv(`${path}/teste.csv`);

    expect(importCategoryMock.prototype.execute).toBeCalledTimes(1);
    expect(importCategoryMock.prototype.execute).toBeCalledWith(file);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(204);
    expect(res.json).not.toBeCalled();
    expect(next).not.toBeCalled();
  });

  it('should response statusCode 400 when call importCategory', async () => {
    const mockRequest = getMockReq();

    const { res, next } = getMockRes();

    const importCategoryError: IServiceError = {
      message: 'Any Error',
      statusCode: 400,
    };

    const serviceError = createServiceError(importCategoryError);

    importCategoryMock.prototype.execute.mockResolvedValue(serviceError);

    await importCategoryController(mockRequest, res, next);

    expect(importCategoryMock.prototype.execute).toBeCalledTimes(1);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: importCategoryError.message });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const csvData = generateCvsData();

    const mockCsvClass = new MockCsv();

    const file = await mockCsvClass.mockCsv(`${path}/teste.csv`, csvData);

    const mockRequest = getMockReq({
      file,
    });

    const { res, next } = getMockRes();

    importCategoryMock.prototype.execute.mockRejectedValue(
      new Error('Fatal Error'),
    );

    await importCategoryController(mockRequest, res, next);

    await mockCsvClass.deleteCsv(`${path}/teste.csv`);

    expect(importCategoryMock.prototype.execute).toBeCalledTimes(1);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});
