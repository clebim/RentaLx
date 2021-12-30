import { ISchemaProps } from '../../index';

export const categoryImportSchema: ISchemaProps = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};
