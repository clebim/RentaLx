import { IPathProps } from '../../index';

export const carPaths: IPathProps = {
  post: {
    tags: ['Car'],
    description: 'Route to create a new car in platform',
    summary: 'Create a new car in platform',
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
            $ref: '#/schemas/createCar',
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
  get: {
    tags: ['Car'],
    description: 'Route to list a cars in platform',
    summary: 'List a cars in platform',
    parameters: [
      {
        description: 'Authorization Bearer token',
        in: 'header',
        name: 'Authorization',
        required: true,
        type: 'string',
      },
      {
        description: 'filter list by name',
        in: 'query',
        name: 'name',
        required: false,
        type: 'string',
      },
      {
        description: 'filter list by min daily rate',
        in: 'query',
        name: 'minDailyRate',
        required: false,
        type: 'string',
      },
      {
        description: 'filter list by max daily rate',
        in: 'query',
        name: 'maxDailyRate',
        required: false,
        type: 'string',
      },
      {
        description: 'filter list by availables cars',
        in: 'query',
        name: 'available',
        required: false,
        type: 'string',
      },
      {
        description: 'filter list by brand',
        in: 'query',
        name: 'brand',
        required: false,
        type: 'string',
      },
      {
        description: 'filter list by categoryId',
        in: 'query',
        name: 'categoryId',
        required: false,
        type: 'string',
      },
      {
        description: 'page to list cars',
        in: 'query',
        name: 'page',
        required: false,
        type: 'string',
      },
      {
        description: 'order list ASC | DESC',
        in: 'query',
        name: 'order',
        required: false,
        type: 'string',
      },
      {
        description: 'order list by',
        in: 'query',
        name: 'order',
        required: false,
        type: 'string',
      },
      {
        description: 'total items per page',
        in: 'query',
        name: 'totalItemsPerPage',
        required: false,
        type: 'number',
      },
    ],
    responses: {
      200: {
        description: 'list with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/listCarsResponse',
            },
          },
        },
      },
      400: {
        description: 'Error in list cars',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/genericError',
            },
          },
        },
      },
      422: {
        description: 'validations error in filters list cars',
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
