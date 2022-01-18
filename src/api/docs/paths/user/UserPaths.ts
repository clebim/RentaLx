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
      200: {
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
        description: 'Error in create a user (Bad request)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  default: 'message error',
                },
              },
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
