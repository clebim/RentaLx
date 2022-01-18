import { ISchemaProps } from '../../index';

export const createUserRequestSchema: ISchemaProps = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      default: 'your name sample',
    },
    email: {
      type: 'string',
      default: 'your email sample',
    },
    password: {
      type: 'string',
      default: 'your password sample',
    },
    driverLicense: {
      type: 'string',
      default: 'your driverLicense sample',
    },
  },
  required: ['email', 'password', 'name', 'driverLicense'],
};

export const createUserResponseSchema: ISchemaProps = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '5e765883-e308-45bd-aa99-b0a251b7dcbf',
    },
    name: {
      type: 'string',
      default: 'user name sample',
    },
    email: {
      type: 'string',
      default: 'user email sample',
    },
    driverLicense: {
      type: 'string',
      default: 'user  driverLicense sample',
    },
    isAdmin: {
      type: 'boolean',
      default: 'user isAdmin sample',
    },
    avatarUrl: {
      type: 'string',
      default: 'null',
    },
    createdAt: {
      type: 'string',
      default: 'user created at',
    },
    updatedAt: {
      type: 'string',
      default: 'user updated at',
    },
  },
};
