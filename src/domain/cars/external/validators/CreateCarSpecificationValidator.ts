import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const bodySchema = {
  specificationsId: joi.array().items(joi.string().uuid()),
};

const paramsSchema = {
  id: joi.string().uuid(),
};

export const createCarSpecificationsBodySchemaValidator = joi.object(
  createValidationSchema(bodySchema, ['specificationsId']),
);

export const createCarSpecificationsParamsSchemaValidator = joi.object(
  createValidationSchema(paramsSchema, ['carId']),
);
