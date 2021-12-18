export const createCategorySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'category name sample',
    },
    description: {
      type: 'string',
      default: 'category description sample',
    },
  },
  required: ['name', 'description'],
};

export const createCategoryResponseSchema = {
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
    createdAt: {
      type: 'string',
      default: '2021-12-16 17:13:09',
    },
  },
};
