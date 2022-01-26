import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from '../../../useCases/uploadCarImages/UploadCarImageUseCase';

export const uploadCarImagesController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const files = request.files as Express.Multer.File[];
    const { id } = request.params;

    const carImagesSuccessIds: string[] = [];
    const carImagesErrors: string[] = [];

    await Promise.all(
      files.map(async file => {
        const { data, isFailure, error } = await uploadCarImageUseCase.execute({
          carId: id,
          imageName: file.filename,
        });

        if (isFailure) {
          carImagesErrors.push(
            `${error.message} - original Image Name: ${file.originalname}`,
          );
        } else {
          carImagesSuccessIds.push(data);
        }
      }),
    );

    return response.status(200).json({
      imageUploadedSucces: carImagesSuccessIds,
      uploadedErrors: carImagesErrors,
    });
  } catch (error) {
    return next(error);
  }
};
