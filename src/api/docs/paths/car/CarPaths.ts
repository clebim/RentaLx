import { IPathProps } from '../../index';

export const carPaths: IPathProps = {
  post: {
    tags: ['Car'],
    description: 'Route to create a new car in platform',
    summary: 'Create a new car in platform',
    responses: {
      201: {
        description: 'Created with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/createCarResponse',
            },
          },
        },
      },
      400: {
        description: 'Error in create car',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/genericError',
            },
          },
        },
      },
      422: {
        description: 'validations error in create car',
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
