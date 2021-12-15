import { NextFunction, Request, Response } from 'express';

import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const repository = new CategoriesRepository();

const createCategoryController = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = request.body;

    const service = new CreateCategoryService(repository);

    const { value, isFailure, error } = service.execute({ name, description });

    if (isFailure) {
      return response.status(error.statusCode).json({ messaeg: error.message });
    }

    return response.status(201).json(value);
  } catch (error) {
    return next(error);
  }
};

export { createCategoryController };
