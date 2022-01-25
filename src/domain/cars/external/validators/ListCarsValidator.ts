import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const schema = {
  name: joi.string(),
  page: joi.number().positive().min(1),
  totalItemsPerPage: joi.number().positive().min(0),
  order: joi.string().valid('ASC', 'DESC'),
  orderBy: joi
    .string()
    .valid(
      'name',
      'dailyRate',
      'fineAmount',
      'available',
      'licensePlate',
      'brand',
      'categoryId',
      'createdAt',
    ),
  minDailyRate: joi.number().positive().precision(2),
  maxDailyRate: joi.number().positive().precision(2),
  categoryId: joi.string().uuid(),
  brand: joi.string(),
  available: joi.boolean(),
};

export const ListCarsQuerySchemaValidator = joi.object(
  createValidationSchema(schema, []),
);
