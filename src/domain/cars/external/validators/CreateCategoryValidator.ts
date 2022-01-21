import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const schema = {
  name: joi.string(),
  description: joi.string().max(250),
};

export const createCategoryBodySchemaValidator = joi.object(
  createValidationSchema(schema, ['name', 'description']),
);
