import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';

import AppConfig from '../config/app';
import { swaggerConfig } from '../docs';
import Routes from './routes';

export default class App {
  public express: express.Application;

  private httpServer: http.Server;

  public constructor() {
    this.express = express();
    this.middleware();
    this.swagger();
    this.express.use('/api', Routes());

    this.express.use((request: Request, response: Response) => {
      response.status(404).send();
    });

    this.express.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log('error', err);

        return res.status(500).json({
          message: 'Internal server error',
          error: err.message,
          errorName: err.name,
        });
      },
    );
  }

  public async start(): Promise<void> {
    this.httpServer = http.createServer(this.express);
    this.httpServer.listen(
      AppConfig.SERVER.http.port,
      AppConfig.SERVER.http.hostname,
      (): void => {
        console.log(
          `running server ${AppConfig.SERVER.http.hostname}:${AppConfig.SERVER.http.port}`,
        );
      },
    );
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.header('Access-Control-Allow-Origin', '*');

        res.header('Access-Control-Allow-Methods', [
          'GET',
          'PATCH',
          'POST',
          'PUT',
          'DELETE',
        ]);
        next();
      },
    );
  }

  private swagger(): void {
    this.express.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerConfig),
    );
  }
}
