import { NextFunction, Request, Response } from 'express';

import { CategoriesRepository } from '../../infra/repositories/CategoriesRepository';
import { ListCategoriesUseCase } from './listCategoriesUseCase';

export const listCategoriesController = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const categoriesRepository = CategoriesRepository.getInstance();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  try {
    const { data, isFailure, error } = listCategoriesUseCase.execute();

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(200).json({
      categories: data,
    });
  } catch (error) {
    return next(error);
  }
};
