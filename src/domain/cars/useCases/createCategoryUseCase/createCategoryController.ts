import { NextFunction, Request, Response } from 'express';

import { CreateCategoryUseCase } from './createCategoryUseCase';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, description } = request.body;

      const { value, isFailure, error } = this.createCategoryUseCase.execute({
        name,
        description,
      });

      if (isFailure) {
        return response
          .status(error.statusCode)
          .json({ messaeg: error.message });
      }

      return response.status(201).json(value);
    } catch (error) {
      return next(error);
    }
  }
}
