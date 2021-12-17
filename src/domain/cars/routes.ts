import { IRouteProps } from '../../startup/routes';
import { createCategoryController } from './useCases/createCategoryUseCase/createCategoryController';
import { createSpecificationController } from './useCases/createSpecificationUseCase/createSpecificationController';
import { listCategoriesController } from './useCases/listCategoriesUseCase/listCategoriesController';

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/categories',
    handlers: [createCategoryController],
  },
  {
    method: 'get',
    path: '/categories',
    handlers: [listCategoriesController],
  },
  {
    method: 'post',
    path: '/specifications',
    handlers: [createSpecificationController],
  },
];

export default routes;
