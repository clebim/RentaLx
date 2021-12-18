import { NextFunction, Request, Response } from 'express';

import { CategoriesRepository } from '../../infra/repositories/CategoriesRepository';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export const importCategoryController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const categoriesRepository = CategoriesRepository.getInstance();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

  try {
    const { file } = request;

    const { data, isFailure, error } = await importCategoryUseCase.execute(
      file,
    );

    if (isFailure) {
      return response.status(error.statusCode).json({ messaeg: error.message });
    }

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
