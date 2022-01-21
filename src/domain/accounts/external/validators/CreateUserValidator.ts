import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const schema = {
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string().min(8),
  driverLicense: joi.string(),
};

export const createUserBodySchemaValidator = joi.object(
  createValidationSchema(schema, [
    'name',
    'email',
    'password',
    'driverLicense',
  ]),
);
