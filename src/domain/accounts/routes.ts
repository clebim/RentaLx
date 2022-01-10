import multer from 'multer';

import { multerConfig } from '../../config/MulterConfig';
import { ensureAuthenticated } from '../../middlewares/EnsureAuthenticated';
import { IRouteProps } from '../../startup/routes';
import { createSessionController } from './useCases/createSession/CreateSessionController';
import { createUserController } from './useCases/createUser/CreateIUserController';
import { updateUserAvatarController } from './useCases/updateUserAvatar/UpdateUserAvatarController';

const uploadMulter = multer(multerConfig('avatar'));

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/users',
    handlers: [createUserController],
  },
  {
    method: 'post',
    path: '/session',
    handlers: [createSessionController],
  },
  {
    method: 'patch',
    path: '/users/avatar',
    handlers: [
      ensureAuthenticated,
      uploadMulter.single('avatar'),
      updateUserAvatarController,
    ],
  },
];

export default routes;
