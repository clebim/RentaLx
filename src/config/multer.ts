import crypto from 'crypto';
import multer, { Options } from 'multer';
import { resolve } from 'path';

type ContextFolder = 'file' | 'avatar';

const pathToTempFile = resolve(__dirname, '..', '..', 'tmp', 'files');
const pathToTempAvatar = resolve(__dirname, '..', '..', 'tmp', 'avatars');

const folders = {
  file: pathToTempFile,
  avatar: pathToTempAvatar,
};

export const multerConfig = (context: ContextFolder): Options => {
  return {
    dest: folders[context],
    storage: multer.diskStorage({
      destination: folders[context],
      filename: (request, file, callback) => {
        const hash = crypto.randomBytes(12).toString('hex');
        const fileName = `${hash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
};
