import { ISchemaProps } from '../../index';

export const createSpecificationSchema: ISchemaProps = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'specification name sample',
    },
    description: {
      type: 'string',
      default: 'specification description sample',
    },
  },
  required: ['name', 'description'],
};

export const createSpecificationResponseSchema: ISchemaProps = {
  type: 'object',
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
};
