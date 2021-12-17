import { IRouteProps } from '../../startup/routes';
import { createCategoryController } from './http/CategoryController';
import { CreateSpecificationController } from './http/SpecificationController';

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/categories',
    handlers: [createCategoryController],
  },
  {
    method: 'post',
    path: '/specifications',
    handlers: [CreateSpecificationController],
  },
];

export default routes;
