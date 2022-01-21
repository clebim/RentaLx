import multer from 'multer';

import { multerConfig } from '../../api/config/Multer';
import { ensureAuthenticated } from '../../api/middlewares/EnsureAuthenticated';
import { validateBody, validateFile } from '../../api/middlewares/validators';
import { IRouteProps } from '../../api/routes';
import { createSessionController } from './adapters/controllers/createSession/CreateSessionController';
import { createUserController } from './adapters/controllers/createUser/CreateUserController';
import { updateUserAvatarController } from './adapters/controllers/updateUserAvatar/UpdateUserAvatarController';
import { createSessionBodySchemaValidator } from './external/validators/CreateSessionValidator';
import { createUserBodySchemaValidator } from './external/validators/CreateUserValidator';
import { updateAvatarSchemaValidator } from './external/validators/UpdateAvatarValidator';

const uploadMulter = multer(multerConfig('avatar'));

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/users',
    handlers: [
      validateBody(createUserBodySchemaValidator),
      createUserController,
    ],
  },
  {
    method: 'post',
    path: '/session',
    handlers: [
      validateBody(createSessionBodySchemaValidator),
      createSessionController,
    ],
  },
  {
    method: 'patch',
    path: '/users/avatar',
    handlers: [
      ensureAuthenticated,
      uploadMulter.single('avatar'),
      validateFile(updateAvatarSchemaValidator),
      updateUserAvatarController,
    ],
  },
];

export default routes;
