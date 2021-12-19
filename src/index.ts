import 'reflect-metadata';
import App from './startup/app';

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
