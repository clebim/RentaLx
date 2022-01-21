import multer from 'multer';

import { multerConfig } from '../../api/config/Multer';
import { ensureAuthenticated } from '../../api/middlewares/EnsureAuthenticated';
import {
  validateBody,
  validateFile,
  validateQuery,
} from '../../api/middlewares/validators';
import { IRouteProps } from '../../api/routes';
import { createCategoryController } from './adapters/controllers/createCategory/CreateCategoryController';
import { createSpecificationController } from './adapters/controllers/createSpecification/CreateSpecificationController';
import { importCategoryController } from './adapters/controllers/importCategory/ImportCategoryController';
import { listCategoriesController } from './adapters/controllers/listCategories/ListCategoriesController';
import { createCategoryBodySchemaValidator } from './external/validators/CreateCategoryValidator';
import { createSpecificationBodySchemaValidator } from './external/validators/CreateSpecificationValidator';
import { importCategorySchemaValidator } from './external/validators/ImportCategoryValidator';
import { ListCategoryQuerySchemaValidator } from './external/validators/ListCategoryValidator';

const uploadMulter = multer(multerConfig('file'));

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/categories',
    handlers: [
      ensureAuthenticated,
      validateBody(createCategoryBodySchemaValidator),
      createCategoryController,
    ],
  },
  {
    method: 'get',
    path: '/categories',
    handlers: [
      ensureAuthenticated,
      validateQuery(ListCategoryQuerySchemaValidator),
      listCategoriesController,
    ],
  },
  {
    method: 'post',
    path: '/categories/import',
    handlers: [
      ensureAuthenticated,
      uploadMulter.single('file'),
      validateFile(importCategorySchemaValidator),
      importCategoryController,
    ],
  },
  {
    method: 'post',
    path: '/specifications',
    handlers: [
      ensureAuthenticated,
      validateBody(createSpecificationBodySchemaValidator),
      createSpecificationController,
    ],
  },
];

export default routes;
