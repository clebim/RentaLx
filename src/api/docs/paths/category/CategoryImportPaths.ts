import { IPathProps } from '../../index';

export const categoryImportsPaths: IPathProps = {
  post: {
    tags: ['Category'],
    description: 'Upload a new file CSV with many categories',
    summary: 'Upload a new CSV file',
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
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/categoryImport',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Import CSV with success',
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
