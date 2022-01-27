import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { deleteFile } from '../../helpers/deleteFile';
import { logger } from '../../helpers/logger';

export const deleteUploadedFileIfError: ErrorRequestHandler = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const files = request.file
      ? [request.file]
      : (request.files as Express.Multer.File[]);

    await Promise.all(
      files.map(async file => {
        await deleteFile(file.path);
      }),
    );
    return next(error);
  } catch (catchError) {
    logger({
      error: catchError,
      type: 'FatalError',
    });
    return next(error);
  }
};
