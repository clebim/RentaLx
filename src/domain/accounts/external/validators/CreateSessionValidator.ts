import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const schema = {
  email: joi.string().email(),
  password: joi.string().min(8),
};

export const createSessionBodySchemaValidator = joi.object(
  createValidationSchema(schema, ['email', 'password']),
);
