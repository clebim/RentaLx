import {
  createCategoryResponseSchema,
  createCategorySchema,
} from './schemas/category/CreateCategorySchema';
import { listAllCategoriesSchema } from './schemas/category/listCategories';
import { internalServerErrorSchema } from './schemas/InternalServerError';

export default {
  internalServerError: internalServerErrorSchema,
  createCategory: createCategorySchema,
  createCategoryResponse: createCategoryResponseSchema,
  listAllCategories: listAllCategoriesSchema,
};
