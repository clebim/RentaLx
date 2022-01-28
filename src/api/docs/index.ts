import AppConfig from '../config/App';
import paths from './Paths';
import schemas from './Schemas';

export type IPathProps = {
  [key: string]: {
    tags: string[];
    summary: string;
    description: string;
    parameters?: {
      name: string;
      in: 'query' | 'header' | 'path';
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
        content?: object;
      };
    };
  };
};

export type ISchemaProps = {
  type: string;
  properties: object;
  required?: string[];
};

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'RentaLx documentation',
    description: 'This is an API Rent',
    version: AppConfig.DOCS.version,
    contact: {
      email: AppConfig.DOCS.supportMail,
    },
  },
  schemas,
  paths,
};
