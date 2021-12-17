import { NextFunction, Request, Response } from 'express';

import { SpecificationRepository } from '../infra/repositories/SpeficicationRepository';
import { CreateSpecificationService } from '../services/CreateSpecificationService';

const repository = new SpecificationRepository();

export const CreateSpecificationController = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = request.body;

    const service = new CreateSpecificationService(repository);

    const { value, isFailure, error } = service.execute({ name, description });

    if (isFailure) {
      return response.status(error.statusCode).json({ messaeg: error.message });
    }

    return response.status(201).json(value);
  } catch (error) {
    return next(error);
  }
};
