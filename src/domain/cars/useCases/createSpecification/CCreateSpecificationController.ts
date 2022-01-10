import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CcreateSpecificationUseCase';

export const createSpecificationController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const createSpecificationUseCase = container.resolve(
    CreateSpecificationUseCase,
  );

  try {
    const { name, description } = request.body;

    const { data, isFailure, error } = await createSpecificationUseCase.execute(
      {
        name,
        description,
      },
    );

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
