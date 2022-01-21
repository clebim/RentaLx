/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

import { HttpError } from '../../errors/HttpError';

const checkAndReturnValidationResult = (
  schema: ObjectSchema<any>,
  data: any,
  joiConfig = {},
) => {
  const { error, value: sanitizedData } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
    ...joiConfig,
  });

  if (!error) {
    return sanitizedData;
  }

  const report = error.details.map(detail => {
    const key = detail.path.join('.');
    const message = detail.message.replace(/['"]/g, '');
    return { [key]: message };
  });

  throw new HttpError(422, 'SERVER-422', 'ValidationError', report);
};
export const validateRequest =
  (joiSchema: ObjectSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      checkAndReturnValidationResult(joiSchema, req);
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateBody =
  (joiSchema: ObjectSchema<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      checkAndReturnValidationResult(joiSchema, body, {
        stripUnknown: true,
      });
      req.body = body;
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateParams =
  (joiSchema: ObjectSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      checkAndReturnValidationResult(joiSchema, params, {
        stripUnknown: true,
      });
      req.params = params;
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateQuery =
  (joiSchema: ObjectSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      checkAndReturnValidationResult(joiSchema, query);
      req.query = query;
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateFile =
  joiSchema => (req: Request, res: Response, next: NextFunction) => {
    try {
      checkAndReturnValidationResult(joiSchema, req.file);
      next();
    } catch (err) {
      next(err);
    }
  };
