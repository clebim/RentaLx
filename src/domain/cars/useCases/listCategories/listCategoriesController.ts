import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './listCategoriesUseCase';

export const listCategoriesController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

  try {
    const { data, isFailure, error } = await listCategoriesUseCase.execute();

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
