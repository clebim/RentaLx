import { IRouteProps } from '../../startup/routes';
import { createCategoryController } from './useCases/createCategoryUseCase';
import { createSpecificationController } from './useCases/createSpecificationUseCase';

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/categories',
    handlers: [createCategoryController.handle],
  },
  {
    method: 'post',
    path: '/specifications',
    handlers: [createSpecificationController.handle],
  },
];

export default routes;
