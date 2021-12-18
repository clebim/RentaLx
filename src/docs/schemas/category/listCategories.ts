export const listAllCategoriesSchema = {
  type: 'object',
  properties: {
    categories: {
      type: 'array',
      items: {
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
      },
    },
  },
};
