import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { IListCategoriesDTO } from '../../../interfaces/categories/IListCategories';
import { ListCategoriesUseCase } from '../../../useCases/listCategories/ListCategoriesUseCase';

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
      page: page ? Number(page) : undefined,
      totalItemsPerPage: totalItemsPerPage
        ? Number(totalItemsPerPage)
        : undefined,
      order,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
