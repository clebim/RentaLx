import crypto from 'crypto';
import multer, { Options } from 'multer';
import { resolve } from 'path';

type ContextFolder = 'file' | 'avatar' | 'carImage';

export const pathToTmpFile = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'files',
);

export const pathToTmpAvatar = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'avatars',
);

export const pathToTmpCarImage = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'tmp',
  'cars',
);

const folders = {
  file: pathToTmpFile,
  avatar: pathToTmpAvatar,
  carImage: pathToTmpCarImage,
};

export const multerConfig = (context: ContextFolder): Options => {
  return {
    dest: folders[context],
    storage: multer.diskStorage({
      destination: folders[context],
      filename: (_, file, callback) => {
        const hash = crypto.randomBytes(12).toString('hex');
        const fileName = `${hash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
};
