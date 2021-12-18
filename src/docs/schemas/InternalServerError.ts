export const internalServerErrorSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      default: 'Internal server error',
    },
    error: {
      type: 'string',
    },
    errorName: {
      type: 'string',
    },
  },
};
