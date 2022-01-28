import { IPathProps } from '../../index';

export const CarImagesPaths: IPathProps = {
  post: {
    tags: ['Car'],
    description: 'Route to upload car images in platform',
    summary: 'Upload a car images in platform',
    parameters: [
      {
        description: 'Authorization Bearer token',
        in: 'header',
        name: 'Authorization',
        required: true,
        type: 'string',
      },
    ],
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/uploadCarImages',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Created with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/uploadCarImagesResponse',
            },
          },
        },
      },
      400: {
        description: 'Error in create carSpecification',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/genericError',
            },
          },
        },
      },
      422: {
        description: 'validations error in create carSpecification',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/validationError',
            },
          },
        },
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/internalServerError',
            },
          },
        },
      },
    },
  },
};
