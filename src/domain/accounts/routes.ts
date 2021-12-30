import { IRouteProps } from '../../startup/routes';
import { createUserController } from './useCases/createUser/CreateIUserController';

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/users',
    handlers: [createUserController],
  },
];

export default routes;
