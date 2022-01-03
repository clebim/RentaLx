import { IRouteProps } from '../../startup/routes';
import { createSessionController } from './useCases/createSession/CreateSessionController';
import { createUserController } from './useCases/createUser/CreateIUserController';

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
];

export default routes;
