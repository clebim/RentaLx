import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export const importCategoryController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
  try {
    const { file } = request;

    const { isFailure, error } = await importCategoryUseCase.execute(file);

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
};
