import express, { Request, Response } from 'express';
import http from 'http';

import AppConfig from '../config/app';

export default class App {
  public express: express.Application;

  private httpServer: http.Server;

  public constructor() {
    this.express = express();
    this.express.use(express.json());

    this.express.use((err: Error, req: Request, res: Response) => {
      console.log('error', err);

      res.status(500).json(err);
    });
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
}
