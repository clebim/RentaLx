import env from 'dotenv';
import path from 'path';

env.config({ path: path.resolve(`./env/.env.${process.env.NODE_ENV}`) });

process.env.ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV;
class AppConfig {
  public static TEST: boolean = process.env.ENVIRONMENT === 'test';

  public static DEV: boolean = process.env.ENVIRONMENT === 'dev';

  public static PROD: boolean = process.env.ENVIRONMENT === 'prod';

  public static SERVER = {
    http: {
      hostname: process.env.HTTP_HOST || 'localhost',
      port: parseInt(process.env.HTTP_PORT, 10) || 3333,
    },
  };
}

export default AppConfig;
