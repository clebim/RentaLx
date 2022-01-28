import 'reflect-metadata';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../../../../helpers/domainResults/CreateUseCaseResults';
import { IUseCaseError } from '../../../../../helpers/domainResults/interfaces';
import { UploadCarImageUseCase } from '../../../useCases/uploadCarImages/UploadCarImageUseCase';
import { uploadCarImagesController } from './UploadCarImagesController';

jest.mock('../../../useCases/uploadCarImages/UploadCarImageUseCase');

const uploadCarImageMock = UploadCarImageUseCase as jest.MockedClass<
  typeof UploadCarImageUseCase
>;

let carImages: Express.Multer.File[];

describe('Upload CarImages Controller', () => {
  beforeEach(() => {
    uploadCarImageMock.prototype.execute.mockRestore();
    carImages = [
      {
        buffer: Buffer.from(faker.datatype.string()),
        fieldname: faker.datatype.string(),
        filename: faker.datatype.string(),
        mimetype: 'image/png',
        originalname: faker.datatype.string(),
        size: faker.datatype.number(),
        path: faker.datatype.string(),
        destination: faker.datatype.string(),
      },
      {
        buffer: Buffer.from(faker.datatype.string()),
        fieldname: faker.datatype.string(),
        filename: faker.datatype.string(),
        mimetype: 'image/png',
        originalname: faker.datatype.string(),
        size: faker.datatype.number(),
        path: faker.datatype.string(),
        destination: faker.datatype.string(),
      },
    ] as Express.Multer.File[];
  });

  it('should response statusCode 200 when call UploadCarImages', async () => {
    const id = faker.datatype.uuid();

    const mockRequest = getMockReq({
      files: carImages,
      params: {
        id,
      },
    });

    const { res, next } = getMockRes();

    uploadCarImageMock.prototype.execute.mockResolvedValueOnce(
      createUseCaseSuccess(faker.datatype.uuid()),
    );
    uploadCarImageMock.prototype.execute.mockResolvedValueOnce(
      createUseCaseSuccess(faker.datatype.uuid()),
    );

    await uploadCarImagesController(mockRequest, res, next);

    expect(uploadCarImageMock.prototype.execute).toBeCalledTimes(2);
    expect(uploadCarImageMock.prototype.execute).toHaveBeenNthCalledWith(1, {
      carId: id,
      imageName: carImages[0].filename,
    });
    expect(uploadCarImageMock.prototype.execute).toHaveBeenNthCalledWith(2, {
      carId: id,
      imageName: carImages[1].filename,
    });
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalled();
    expect(next).not.toBeCalled();
  });

  it('should response statusCode 200 when call UploadCarImages with 1 succes and 1 error', async () => {
    const { res, next } = getMockRes();
    const id = faker.datatype.uuid();

    const mockRequest = getMockReq({
      files: carImages,
      params: {
        id,
      },
    });

    const uploadCarImagesError: IUseCaseError = {
      message: 'Any Error',
      statusCode: 400,
    };

    const useCaseError = createUseCaseError(uploadCarImagesError);

    const idSuccess = faker.datatype.uuid();

    uploadCarImageMock.prototype.execute.mockResolvedValueOnce(
      createUseCaseSuccess(idSuccess),
    );

    uploadCarImageMock.prototype.execute.mockResolvedValueOnce(useCaseError);

    await uploadCarImagesController(mockRequest, res, next);

    expect(uploadCarImageMock.prototype.execute).toBeCalledTimes(2);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      imageUploadedSucces: [idSuccess],
      imageuploadedErrors: [
        `${uploadCarImagesError.message} - original Image Name: ${carImages[1].originalname}`,
      ],
    });
    expect(next).toBeCalledTimes(0);
  });

  it('method next should be called because there was a fatal error', async () => {
    const { res, next } = getMockRes();
    const id = faker.datatype.uuid();

    const mockRequest = getMockReq({
      files: carImages,
      params: {
        id,
      },
    });

    uploadCarImageMock.prototype.execute.mockRejectedValueOnce(
      new Error('Fatal Error'),
    );

    await uploadCarImagesController(mockRequest, res, next);

    expect(uploadCarImageMock.prototype.execute).toBeCalledTimes(2);
    expect(res.status).toBeCalledTimes(0);
    expect(res.json).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });
});
