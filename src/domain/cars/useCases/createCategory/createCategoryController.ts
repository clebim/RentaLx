import { NextFunction, Request, Response } from 'express';

import { CategoriesRepository } from '../../infra/repositories/CategoriesRepository';
import { CreateCategoryUseCase } from './createCategoryUseCase';

export const createCategoryController = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('chegou');
  const categoriesRepository = CategoriesRepository.getInstance();

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  try {
    const { name, description } = request.body;

    const { data, isFailure, error } = createCategoryUseCase.execute({
      name,
      description,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ messaeg: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
