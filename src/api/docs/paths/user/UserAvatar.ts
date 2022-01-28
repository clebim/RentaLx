import { IPathProps } from '../../index';

export const UserAvatarPaths: IPathProps = {
  patch: {
    tags: ['User'],
    description: 'Route to update user avatar in platform',
    summary: 'Update user avatar in platform',
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
            $ref: '#/schemas/updateUserAvatar',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Updated with success',
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
