import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const schema = {
  name: joi.string(),
  description: joi.string().max(250),
  page: joi.number().positive().min(1),
  totalItemsPerPage: joi.number().positive().min(0),
  order: joi.string().valid('ASC', 'DESC'),
};

export const ListCategoryQuerySchemaValidator = joi.object(
  createValidationSchema(schema, []),
);
