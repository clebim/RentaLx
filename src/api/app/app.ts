import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';

import { closeConnection, startConnection } from '../../infra/database';
import AppConfig from '../config/App';
import { pathToTmpAvatar } from '../config/Multer';
import { swaggerConfig } from '../docs';
import Routes from '../routes';
import '../../shared/container';
import { HttpError } from '../../errors/HttpError';

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
        const exception = AppConfig.PROD ? undefined : err;

        if (err instanceof HttpError) {
          const { code } = err;
          const report = AppConfig.PROD ? undefined : err.report;
          const { message } = err;

          return res.status(Number(err.statusCode)).json({
            code,
            message,
            report,
            exception,
          });
        }
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
    startConnection();
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

  public close(): void {
    if (this.httpServer !== null) {
      this.httpServer.close();
    }
    closeConnection();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use('/api/files/avatar', express.static(pathToTmpAvatar));
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
      '/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerConfig),
    );
  }
}
