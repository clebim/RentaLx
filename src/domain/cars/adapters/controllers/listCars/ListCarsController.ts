import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IListCarsDTO } from '../../../interfaces/cars/IListCars';
import { ListCarsUseCase } from '../../../useCases/listCars/ListCarsUseCase';

export const listCarsController = async (
  request: Request<unknown, unknown, unknown, IListCarsDTO>,
  response: Response,
  next: NextFunction,
) => {
  const listCarsUseCase = container.resolve(ListCarsUseCase);

  const { minDailyRate, maxDailyRate, available, page, totalItemsPerPage } =
    request.query;

  try {
    const { data, isFailure, error } = await listCarsUseCase.execute({
      ...request.query,
      minDailyRate: minDailyRate ? Number(minDailyRate) : undefined,
      maxDailyRate: maxDailyRate ? Number(maxDailyRate) : undefined,
      available: available ? Boolean(available) : undefined,
      page: page ? Number(page) : page,
      totalItemsPerPage: totalItemsPerPage
        ? Number(totalItemsPerPage)
        : undefined,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
