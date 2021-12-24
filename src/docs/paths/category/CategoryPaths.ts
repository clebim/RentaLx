import { IPathProps } from '../../index';

export const categoryPaths: IPathProps = {
  post: {
    tags: ['Category'],
    description: 'Create a new category',
    summary: 'Create a category',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createCategory',
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
              $ref: '#/schemas/createCategoryResponse',
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
  get: {
    tags: ['Category'],
    description: 'List all categories',
    summary: 'List categories',
    responses: {
      200: {
        description: 'All categories listed with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/listAllCategories',
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