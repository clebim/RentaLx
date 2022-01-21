import { IPathProps } from '../../index';

export const categoryPaths: IPathProps = {
  post: {
    tags: ['Category'],
    description: 'Create a new category',
    summary: 'Create a category',
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
      400: {
        description: 'Error in create category',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/genericError',
            },
          },
        },
      },
      422: {
        description: 'validations error in create category',
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
  get: {
    tags: ['Category'],
    description: 'List all categories',
    summary: 'List categories',
    parameters: [
      {
        description: 'Authorization Bearer token',
        in: 'header',
        name: 'Authorization',
        required: true,
        type: 'string',
      },
      {
        description: 'order list',
        in: 'query',
        name: 'order',
        required: false,
        type: 'string',
      },
      {
        description: 'name to filter list',
        in: 'query',
        name: 'name',
        required: false,
        type: 'string',
      },
      {
        description: 'page list',
        in: 'query',
        name: 'page',
        required: false,
        type: 'number',
      },
      {
        description: 'total items per page',
        in: 'query',
        name: 'totalItemsPerPage',
        required: false,
        type: 'number',
      },
      {
        description: 'description to filte list',
        in: 'query',
        name: 'description',
        required: false,
        type: 'string',
      },
    ],
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
      400: {
        description: 'Error in create category',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/genericError',
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
