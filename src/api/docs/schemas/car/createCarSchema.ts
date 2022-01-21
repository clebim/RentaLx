import { ISchemaProps } from '../../index';

export const createCarSchema: ISchemaProps = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'car name sample',
    },
    description: {
      type: 'string',
      default: 'car description sample',
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
    categoryId: {
      type: 'string',
      default: '5e765883-e308-45bd-aa99-b0a251b7dcbf',
    },
  },
  required: [
    'name',
    'description',
    'dailyRate',
    'licensePlate',
    'fineAmount',
    'brand',
    'categoryId',
  ],
};

export const createCarResponseSchema: ISchemaProps = {
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
    categoryId: {
      type: 'string',
      default: '5e765883-e308-45bd-aa99-b0a251b7dcbf',
    },
    createdAt: {
      type: 'string',
      default: '2021-12-16 17:13:09',
    },
  },
};
