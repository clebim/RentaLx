import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateCarDTO } from '../../../interfaces/cars/ICreateCar';
import { CreateCarUseCase } from '../../../useCases/createCar/CreateCarUseCase';

export const createCarController = async (
  request: Request<unknown, unknown, ICreateCarDTO>,
  response: Response,
  next: NextFunction,
) => {
  const createCategoryUseCase = container.resolve(CreateCarUseCase);

  try {
    const { data, isFailure, error } = await createCategoryUseCase.execute(
      request.body,
    );

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
