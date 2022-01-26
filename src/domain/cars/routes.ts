import multer from 'multer';

import { multerConfig } from '../../api/config/Multer';
import { ensureAdmin } from '../../api/middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../../api/middlewares/EnsureAuthenticated';
import {
  validateBody,
  validateFile,
  validateMultipleFiles,
  validateParams,
  validateQuery,
} from '../../api/middlewares/validators';
import { IRouteProps } from '../../api/routes';
import { createCarController } from './adapters/controllers/createCar/CreateCarController';
import { CreateCarSpecificationController } from './adapters/controllers/createCarSpecification/CreateCarSpecificationController';
import { createCategoryController } from './adapters/controllers/createCategory/CreateCategoryController';
import { createSpecificationController } from './adapters/controllers/createSpecification/CreateSpecificationController';
import { importCategoryController } from './adapters/controllers/importCategory/ImportCategoryController';
import { listCarsController } from './adapters/controllers/listCars/ListCarsController';
import { listCategoriesController } from './adapters/controllers/listCategories/ListCategoriesController';
import { uploadCarImagesController } from './adapters/controllers/uploadCarImages/UploadCarImagesController';
import {
  createCarSpecificationsBodySchemaValidator,
  createCarSpecificationsParamsSchemaValidator,
} from './external/validators/CreateCarSpecificationValidator';
import { createCarBodySchemaValidator } from './external/validators/CreateCarValidator';
import { createCategoryBodySchemaValidator } from './external/validators/CreateCategoryValidator';
import { createSpecificationBodySchemaValidator } from './external/validators/CreateSpecificationValidator';
import { importCategorySchemaValidator } from './external/validators/ImportCategoryValidator';
import { ListCarsQuerySchemaValidator } from './external/validators/ListCarsValidator';
import { ListCategoryQuerySchemaValidator } from './external/validators/ListCategoryValidator';
import { uploadCarImagesSchemaValidator } from './external/validators/UploadCarImagesValidator';

const uploadMulter = multer(multerConfig('file'));
const uploadCarMulter = multer(multerConfig('carImage'));

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
      ensureAdmin,
      validateBody(createSpecificationBodySchemaValidator),
      createSpecificationController,
    ],
  },
  {
    method: 'post',
    path: '/cars',
    handlers: [
      ensureAuthenticated,
      ensureAdmin,
      validateBody(createCarBodySchemaValidator),
      createCarController,
    ],
  },
  {
    method: 'get',
    path: '/cars',
    handlers: [
      ensureAuthenticated,
      validateQuery(ListCarsQuerySchemaValidator),
      listCarsController,
    ],
  },
  {
    method: 'post',
    path: '/cars/specifications/:id',
    handlers: [
      ensureAuthenticated,
      ensureAdmin,
      validateParams(createCarSpecificationsParamsSchemaValidator),
      validateBody(createCarSpecificationsBodySchemaValidator),
      CreateCarSpecificationController,
    ],
  },
  {
    method: 'post',
    path: '/cars/images/:id',
    handlers: [
      ensureAuthenticated,
      ensureAdmin,
      uploadCarMulter.array('images'),
      validateMultipleFiles(uploadCarImagesSchemaValidator),
      uploadCarImagesController,
    ],
  },
];

export default routes;
