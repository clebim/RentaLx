import crypto from 'crypto';
import multer, { Options } from 'multer';
import { resolve } from 'path';

const pathToTempFolder = resolve(__dirname, '..', '..', 'tmp', 'files');

export const multerConfig: Options = {
  dest: pathToTempFolder,
  storage: multer.diskStorage({
    destination: pathToTempFolder,
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(12).toString('hex');
      const fileName = `${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
