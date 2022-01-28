import { ISchemaProps } from '../../index';

export const uploadCarImagesSchema: ISchemaProps = {
  type: 'object',
  properties: {
    images: {
      type: 'array',
      items: {
        type: 'file',
        format: 'image/jpeg, image/jpg, image/png',
      },
    },
  },
};

export const uploadCarImagesResponseSchema: ISchemaProps = {
  type: 'object',
  properties: {
    imageUploadedSucces: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    imageuploadedErrors: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
