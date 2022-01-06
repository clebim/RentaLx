import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IListCategoriesDTO } from '../../interfaces/categories/IListCategories';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export const listCategoriesController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

  const { name, description, totalItemsPerPage, page, order } =
    request.query as IListCategoriesDTO;

  try {
    const { data, isFailure, error } = await listCategoriesUseCase.execute({
      name,
      description,
      totalItemsPerPage: Number(totalItemsPerPage),
      page: Number(page),
      order,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(200).json({
      categories: data,
    });
  } catch (error) {
    return next(error);
  }
};
