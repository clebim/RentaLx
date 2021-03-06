import { IPathProps } from '../../index';

export const userPaths: IPathProps = {
  post: {
    tags: ['User'],
    description: 'Create a new user',
    summary: 'Create a user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createUser',
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
              $ref: '#/schemas/createUserResponse',
            },
          },
        },
      },
      400: {
        description: 'Error in create user',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/genericError',
            },
          },
        },
      },
      422: {
        description: 'validations error in create user',
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
