import multer from 'multer';

import { multerConfig } from '../../api/config/Multer';
import { ensureAuthenticated } from '../../api/middlewares/EnsureAuthenticated';
import { IRouteProps } from '../../api/routes';
import { createCategoryController } from './adapters/controllers/createCategory/CreateCategoryController';
import { createSpecificationController } from './adapters/controllers/createSpecification/CreateSpecificationController';
import { importCategoryController } from './adapters/controllers/importCategory/ImportCategoryController';
import { listCategoriesController } from './adapters/controllers/listCategories/ListCategoriesController';

const uploadMulter = multer(multerConfig('file'));

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
