import { NextFunction, Request, Response } from 'express';

export const ensureAdmin = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { isAdmin } = request.userPayloadData;

  if (!isAdmin) {
    return response.status(403).json({
      message: "User isn't admin!",
    });
  }

  return next();
};
