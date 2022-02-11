import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateRentalDTO } from '../../interfaces/rental/ICreateRental';
import { CreateRentalUseCase } from '../../useCases/CreateRentalUseCase';

export const createRentalController = async (
  request: Request<unknown, unknown, ICreateRentalDTO>,
  response: Response,
  next: NextFunction,
) => {
  const createRentalUseCase = container.resolve(CreateRentalUseCase);

  try {
    const { timezone } = request.headers;

    const { data, isFailure, error } = await createRentalUseCase.execute(
      request.body,
      timezone as string,
    );

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
