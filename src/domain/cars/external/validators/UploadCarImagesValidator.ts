import joi from 'joi';

import { createValidationSchema } from '../../../../helpers/createValidationSchema';

const MAX_FILE_SIZE_MB = 1024 * 1024 * 3;

const image = {
  fieldname: joi.string().valid('avatar').required(),
  originalname: joi.string().required(),
  mimetype: joi
    .string()
    .valid('image/jpeg', 'image/jpg', 'image/png')
    .required(),
  size: joi.number().max(MAX_FILE_SIZE_MB).required(),
  buffer: joi.binary().required(),
};

const multipleFiles = { files: joi.array().items(joi.object(image)).min(1) };

export const uploadCarImagesSchemaValidator = joi.object(
  createValidationSchema(multipleFiles, []),
);
