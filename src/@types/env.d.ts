declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface ProcessEnv {
    NODE_ENV?: string;
    ENVIRONMENT?: string;
    HTTP_HOST?: string;
    HTTP_PORT?: string;
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    REDIS_PASSWORD?: string;
    REDIS_EXPIRATION_TIME?: string;
  }
}
