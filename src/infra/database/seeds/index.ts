import { readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

import AppConfig from '../../../api/config/App';
import { startConnection, closeConnection } from '../index';

const directory = resolve(__dirname);

const isDirectory = path => statSync(path).isFile();

const fileExtension = AppConfig.DEV || AppConfig.TEST ? '.ts' : '.js';

const concat = (array, dir: string) => {
  if (!existsSync(dir)) {
    return array;
  }
  // eslint-disable-next-line
  const mod = require(dir).default;
  return array.concat(mod);
};

const runSeeds = async () => {
  const seeds = readdirSync(directory)
    .map(file => join(directory, file))
    .filter(isDirectory)
    .filter(file => file.endsWith(`.seed${fileExtension}`))
    .reduce(concat, []);

  await startConnection();

  await new Promise((resolve, reject) => {
    try {
      let count = 0;

      if (seeds.length === 0) {
        resolve(true);
      }

      // eslint-disable-next-line @typescript-eslint/ban-types
      seeds.forEach(async (fun: Function) => {
        await fun();
        count += 1;

        if (count === seeds.length) {
          resolve(true);
        }
      });
    } catch (error) {
      reject();
    }
  });

  closeConnection();
};

runSeeds();
