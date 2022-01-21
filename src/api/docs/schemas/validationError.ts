export const validationErrorSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      default: 'SERVER-422',
    },
    message: {
      type: 'string',
      default: 'message error sample',
    },
    report: {
      type: 'array',
      items: {
        type: 'string',
      },
      example: [{ propertyName: 'error sample' }],
    },
  },
};
