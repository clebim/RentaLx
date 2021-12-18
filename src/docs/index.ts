import paths from './paths';
import schemas from './schemas';

export type IPathProps = {
  [key: string]: {
    tags: string[];
    summary: string;
    description: string;
    parameters?: {
      name: string;
      in: 'query';
      description: string;
      required: boolean;
      type: string;
    }[];
    requestBody?: {
      content: object;
    };
    responses: {
      [key: number]: {
        description: string;
        content: object;
      };
    };
  };
};

export type ISchemaProps = {
  type: string;
  properties: object;
  examples?: object;
  required?: string[];
};

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'RentaLx documentation',
    description: 'This is an API Rent',
    version: '1.0.0',
    contact: {
      email: 'matheuscleber1998@gmail.com',
    },
  },
  schemas,
  paths,
};
