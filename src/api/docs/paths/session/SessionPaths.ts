import { IPathProps } from '../../index';

export const sessionPaths: IPathProps = {
  post: {
    tags: ['Session'],
    description: 'Create a new session and get access token',
    summary: 'Create a session',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createSession',
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
              $ref: '#/schemas/createSessionResponse',
            },
          },
        },
      },
      400: {
        description: 'Error in create a session (Bad request)',
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
