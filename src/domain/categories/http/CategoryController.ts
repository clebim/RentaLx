import { NextFunction, Request, Response } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
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

    const result = service.execute({ name, description });

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export { createCategoryController };
