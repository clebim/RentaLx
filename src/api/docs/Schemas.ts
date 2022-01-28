import {
  createCarResponseSchema,
  createCarSchema,
} from './schemas/car/createCarSchema';
import {
  createCarSpecificationResponseSchema,
  createCarSpecificationSchema,
} from './schemas/car/createCarSpecificationSchema';
import { listCarsResponseSchema } from './schemas/car/ListCarsSchema';
import {
  uploadCarImagesResponseSchema,
  uploadCarImagesSchema,
} from './schemas/car/UploadCarImagesSchema';
import { categoryImportSchema } from './schemas/category/CategoryImportFileSchema';
import {
  createCategoryResponseSchema,
  createCategorySchema,
} from './schemas/category/CreateCategorySchema';
import { listAllCategoriesSchema } from './schemas/category/ListCategories';
import { genericErrorSchema } from './schemas/genericError';
import { internalServerErrorSchema } from './schemas/InternalServerError';
import {
  createSessionRequestSchema,
  createSessionResponseSchema,
} from './schemas/session/CreateSessionSchema';
import {
  createSpecificationResponseSchema,
  createSpecificationSchema,
} from './schemas/specification/CreateSpeficiationSchema';
import {
  createUserRequestSchema,
  createUserResponseSchema,
} from './schemas/user/CreateUserSchema';
import { UpdateUserAvatarSchema } from './schemas/user/UpdateUserAvatarSchema';
import { validationErrorSchema } from './schemas/validationError';

export default {
  internalServerError: internalServerErrorSchema,
  genericError: genericErrorSchema,
  validationError: validationErrorSchema,
  createCategory: createCategorySchema,
  createCategoryResponse: createCategoryResponseSchema,
  listAllCategories: listAllCategoriesSchema,
  categoryImport: categoryImportSchema,
  createSpeficication: createSpecificationSchema,
  createSpecificationResponse: createSpecificationResponseSchema,
  createSession: createSessionRequestSchema,
  createSessionResponse: createSessionResponseSchema,
  createUser: createUserRequestSchema,
  createUserResponse: createUserResponseSchema,
  updateUserAvatar: UpdateUserAvatarSchema,
  createCar: createCarSchema,
  createCarResponse: createCarResponseSchema,
  listCarsResponse: listCarsResponseSchema,
  createCarSpecification: createCarSpecificationSchema,
  createCarSpecificationResponse: createCarSpecificationResponseSchema,
  uploadCarImages: uploadCarImagesSchema,
  uploadCarImagesResponse: uploadCarImagesResponseSchema,
};
