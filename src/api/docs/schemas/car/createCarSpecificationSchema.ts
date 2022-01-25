import { ISchemaProps } from '../../index';

export const createCarSpecificationSchema: ISchemaProps = {
  type: 'object',
  properties: {
    specificationsId: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['specificationsId'],
};

export const createCarSpecificationResponseSchema: ISchemaProps = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '5e765883-e308-45bd-aa99-b0a251b7dcbf',
    },
    name: {
      type: 'string',
      default: 'category name sample',
    },
    description: {
      type: 'string',
      default: 'category description sample',
    },
    dailyRate: {
      type: 'number',
      default: 'daily rate sample',
    },
    licensePlate: {
      type: 'string',
      default: 'license plate sample',
    },
    fineAmount: {
      type: 'number',
      default: 'fine amount sample',
    },
    brand: {
      type: 'string',
      default: 'brand sample',
    },
    available: {
      type: 'boolean',
      default: true,
    },
    categoryId: {
      type: 'string',
      default: '5e765883-e308-45bd-aa99-b0a251b7dcbf',
    },
    specifications: {
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'string',
            default: '5e765883-e308-45bd-aa99-b0a251b7dcbf',
          },
          name: {
            type: 'string',
            default: 'specification name sample',
          },
          description: {
            type: 'string',
            default: 'specification description sample',
          },
          createdAt: {
            type: 'string',
            default: '2021-12-16 17:13:09',
          },
        },
      },
    },
    createdAt: {
      type: 'string',
      default: '2021-12-16 17:13:09',
    },
  },
};
