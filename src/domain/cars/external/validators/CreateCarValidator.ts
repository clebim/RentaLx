import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const schema = {
  name: joi.string(),
  description: joi.string().max(250),
  dailyRate: joi.number().positive().precision(2),
  licensePlate: joi.string(),
  fineAmount: joi.number().positive().precision(2),
  brand: joi.string(),
  categoryId: joi.string().uuid(),
};

export const createCarBodySchemaValidator = joi.object(
  createValidationSchema(schema, [
    'name',
    'description',
    'dailyRate',
    'licensePlate',
    'fineAmount',
    'brand',
    'categoryId',
  ]),
);
