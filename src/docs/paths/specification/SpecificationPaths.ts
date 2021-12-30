import { IPathProps } from '../../index';

export const specificationPaths: IPathProps = {
  post: {
    tags: ['Specification'],
    description: 'Create a new specification',
    summary: 'Create a specification',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createSpeficication',
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
              $ref: '#/schemas/createSpecificationResponse',
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
