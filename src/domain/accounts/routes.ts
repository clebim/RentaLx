import multer from 'multer';

import { multerConfig } from '../../api/config/Multer';
import { ensureAuthenticated } from '../../api/middlewares/EnsureAuthenticated';
import { IRouteProps } from '../../api/routes';
import { createSessionController } from './useCases/createSession/CreateSessionController';
import { createUserController } from './useCases/createUser/CreateUserController';
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
