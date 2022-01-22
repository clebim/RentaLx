import 'reflect-metadata';

import App from './app';

function startApp() {
  const app = new App();
  Promise.resolve()
    .then(() => {
      app.start();
    })
    .catch(() => {
      app.close();
    });
}

startApp();
