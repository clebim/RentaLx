import { IRouteProps } from '../../startup/routes';
import { createCategoryController } from './http/CategoryController';

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/categories',
    handlers: [createCategoryController],
  },
];

export default routes;
