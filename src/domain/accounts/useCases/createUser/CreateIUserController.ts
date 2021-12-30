import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '../../interfaces/ICreateUser';
import { CreateUserUseCase } from './CreateUserUseCase';

export const createUserController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const createUserUseCase = container.resolve(CreateUserUseCase);

  try {
    const { body } = request;

    const { data, isFailure, error } = await createUserUseCase.execute(
      body as ICreateUserDTO,
    );

    console.log(isFailure, error);

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
