import 'reflect-metadata';
import path from 'path';

import App from './startup/app';

function startApp() {
  const app = new App();
  console.log(process.env.HTTP_HOST, process.env.NODE_ENV);
  console.log(path.basename(__filename));
  Promise.resolve()
    .then(() => {
      app.start();
    })
    .catch(() => {
      app.close();
    });
}

startApp();
