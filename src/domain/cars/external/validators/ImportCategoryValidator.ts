import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const MAX_FILE_SIZE_MB = 1024 * 1024 * 3;

const file = {
  fieldname: joi.string().valid('file'),
  originalname: joi.string(),
  mimetype: joi.string().valid('application/csv', 'text/csv'),
  size: joi.number().max(MAX_FILE_SIZE_MB),
  buffer: joi.binary(),
};

export const importCategorySchemaValidator = joi.object(
  createValidationSchema(file, [
    'fieldname',
    'originalname',
    'mimetype',
    'size',
  ]),
);
