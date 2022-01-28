import { ISchemaProps } from '../../index';

export const UpdateUserAvatarSchema: ISchemaProps = {
  type: 'object',
  properties: {
    avatar: {
      type: 'file',
      format: 'image/jpeg, image/jpg, image/png',
    },
  },
};
