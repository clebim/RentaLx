import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export const updateUserAvatarController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

  try {
    const { id } = request.userPayloadData;
    const { filename } = request.file;

    const { isFailure, error } = await updateUserAvatarUseCase.execute({
      userId: id,
      avatarFile: filename,
    });

    if (isFailure) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
};
