import multer from 'multer';

import { multerConfig } from '../../config/Multer';
import { ensureAuthenticated } from '../../middlewares/EnsureAuthenticated';
import { IRouteProps } from '../../startup/routes';
import { createCategoryController } from './useCases/createCategory/CreateCategoryController';
import { createSpecificationController } from './useCases/createSpecification/CreateSpecificationController';
import { importCategoryController } from './useCases/importCategory/ImportCategoryController';
import { listCategoriesController } from './useCases/listCategories/ListCategoriesController';

const uploadMulter = multer(multerConfig);

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/categories',
    handlers: [ensureAuthenticated, createCategoryController],
  },
  {
    method: 'get',
    path: '/categories',
    handlers: [ensureAuthenticated, listCategoriesController],
  },
  {
    method: 'post',
    path: '/categories/import',
    handlers: [
      ensureAuthenticated,
      uploadMulter.single('file'),
      importCategoryController,
    ],
  },
  {
    method: 'post',
    path: '/specifications',
    handlers: [ensureAuthenticated, createSpecificationController],
  },
];

export default routes;
