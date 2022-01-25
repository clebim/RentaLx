import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from '../../../useCases/createCarSepecification/CreateCarSpecificationUseCase';

export const CreateCarSpecificationController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const createCarSpecificationUseCase = container.resolve(
    CreateCarSpecificationUseCase,
  );

  try {
    const { id } = request.params;
    const { specificationsId } = request.body;

    const { data, isFailure, error } =
      await createCarSpecificationUseCase.execute({
        carId: id,
        specificationsId,
      });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
