import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export const createCategoryController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

  try {
    const { name, description } = request.body;

    const { data, isFailure, error } = await createCategoryUseCase.execute({
      name,
      description,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
