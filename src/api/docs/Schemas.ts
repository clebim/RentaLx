import { categoryImportSchema } from './schemas/category/CategoryImportFileSchema';
import {
  createCategoryResponseSchema,
  createCategorySchema,
} from './schemas/category/CreateCategorySchema';
import { listAllCategoriesSchema } from './schemas/category/ListCategories';
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

export default {
  internalServerError: internalServerErrorSchema,
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
};
