import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '../../../interfaces/user/ICreateUser';
import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';

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

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};
