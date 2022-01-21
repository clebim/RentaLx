import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const MAX_FILE_SIZE_MB = 1024 * 1024 * 3;

const avatar = {
  fieldname: joi.string().valid('avatar'),
  originalname: joi.string(),
  mimetype: joi.string().valid('image/jpeg', 'image/jpg', 'image/png'),
  size: joi.number().max(MAX_FILE_SIZE_MB),
  buffer: joi.binary(),
};

export const updateAvatarSchemaValidator = joi.object(
  createValidationSchema(avatar, [
    'fieldname',
    'originalname',
    'mimetype',
    'size',
  ]),
);
