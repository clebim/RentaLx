import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionUseCase } from './CreateSessionUseCase';

export const createSessionController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const createSessionUseCase = container.resolve(CreateSessionUseCase);

  try {
    const { email, password } = request.body;

    const { data, isFailure, error } = await createSessionUseCase.execute({
      email,
      password,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
