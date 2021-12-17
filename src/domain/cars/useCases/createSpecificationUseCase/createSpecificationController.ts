import { NextFunction, Request, Response } from 'express';

import { CreateSpecificationUseCase } from './createSpecificationUseCase';

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, description } = request.body;

      const { value, isFailure, error } =
        this.createSpecificationUseCase.execute({
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
