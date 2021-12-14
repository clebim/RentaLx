import express, { Request, Response } from 'express';
import http from 'http';

import { appConfig } from './config/app';

export default class App {
  public express: express.Application = null;

  private httpServer: http.Server = null;

  public constructor() {
    this.express = express();
    this.express.use(express.json());

    this.express.use((err: Error, req: Request, res: Response) => {
      console.log('error', err);

      res.status(500).json(err);
    });
  }

  public async start(): Promise<void> {
    const { expressHostName, expressPort } = appConfig;

    this.httpServer = http.createServer(this.express);
    this.httpServer.listen(expressPort, expressHostName, (): void => {
      console.log(`running server ${expressHostName}:${expressPort}`);
    });
  }
}
