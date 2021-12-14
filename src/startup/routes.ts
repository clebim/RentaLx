/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { RequestHandler, Router } from 'express';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

import AppConfig from '../config/app';

export type IRouteProps = {
  method: string;
  path: string;
  handlers: Array<RequestHandler>;
};

const directory = resolve(__dirname, '../', 'domain');

const isDirectory = path => statSync(path).isDirectory();

const fileExtension = AppConfig.DEV || AppConfig.TEST ? '.ts' : '.js';

function concat(routes, dir: string) {
  const path = `${dir}/routes`;
  if (!existsSync(path + fileExtension)) {
    return routes;
  }
  // eslint-disable-next-line
  const mod = require(path).default;
  return routes.concat(mod);
}

function load(arr: Array<IRouteProps>, app: Router) {
  arr.forEach(route => {
    const fn = app[route.method];
    const { handlers } = route;
    fn.call(app, route.path, handlers);
  });
  return app;
}

const router = () => {
  const finalRoutes: IRouteProps[] = readdirSync(directory)
    .map(file => join(directory, file))
    .filter(isDirectory)
    .reduce(concat, []);
  return load(finalRoutes, express.Router());
};

export default router;
