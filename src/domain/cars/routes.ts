import multer from 'multer';

import { multerConfig } from '../../config/multer';
import { IRouteProps } from '../../startup/routes';
import { createCategoryController } from './useCases/createCategory/createCategoryController';
import { createSpecificationController } from './useCases/createSpecification/createSpecificationController';
import { importCategoryController } from './useCases/importCategory/ImportCategoryController';
import { listCategoriesController } from './useCases/listCategories/listCategoriesController';

const uploadMulter = multer(multerConfig);

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
    path: '/categories/import',
    handlers: [uploadMulter.single('file'), importCategoryController],
  },
  {
    method: 'post',
    path: '/specifications',
    handlers: [createSpecificationController],
  },
];

export default routes;
