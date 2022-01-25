export const listCarsResponseSchema = {
  type: 'object',
  properties: {
    cars: {
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
          createdAt: {
            type: 'string',
            default: '2021-12-16 17:13:09',
          },
        },
      },
    },
    page: {
      type: 'number',
      default: 1,
    },
    totalItemsPerPage: {
      type: 'number',
      default: 30,
    },
    totalItems: {
      type: 'number',
      default: 10,
    },
    totalPages: {
      type: 'number',
      default: 1,
    },
  },
};
