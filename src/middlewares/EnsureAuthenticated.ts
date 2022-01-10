import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppConfig from '../config/App';

export interface IUserPayloadData {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'token not provided' });
  }

  const [, token] = authorization.split(' ');

  try {
    const payload = verify(token, AppConfig.Auth.secret) as IUserPayloadData;

    request.userPayloadData = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      isAdmin: payload.isAdmin,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'invalid jwt token' });
  }
};
