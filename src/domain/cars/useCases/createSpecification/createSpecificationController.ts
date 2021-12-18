import { NextFunction, Request, Response } from 'express';

import { SpecificationRepository } from '../../infra/repositories/SpeficicationRepository';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

export const createSpecificationController = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const specificationRepository = SpecificationRepository.getInstance();
  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepository,
  );

  try {
    const { name, description } = request.body;

    const { data, isFailure, error } = createSpecificationUseCase.execute({
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
