import { IPathProps } from '../../index';

export const CarSpecificationPaths: IPathProps = {
  post: {
    tags: ['Car'],
    description: 'Route to create a new carSpecification in platform',
    summary: 'Create a new carSpecification in platform',
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
        'application/json': {
          schema: {
            $ref: '#/schemas/createCarSpecification',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/createCarSpecificationResponse',
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
