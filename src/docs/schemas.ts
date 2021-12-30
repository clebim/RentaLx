import { categoryImportSchema } from './schemas/category/CategoryImportFileSchema';
import {
  createCategoryResponseSchema,
  createCategorySchema,
} from './schemas/category/CreateCategorySchema';
import { listAllCategoriesSchema } from './schemas/category/ListCategories';
import { internalServerErrorSchema } from './schemas/InternalServerError';
import {
  createSpecificationResponseSchema,
  createSpecificationSchema,
} from './schemas/specification/CreateSpeficiationSchema';

export default {
  internalServerError: internalServerErrorSchema,
  createCategory: createCategorySchema,
  createCategoryResponse: createCategoryResponseSchema,
  listAllCategories: listAllCategoriesSchema,
  categoryImport: categoryImportSchema,
  createSpeficication: createSpecificationSchema,
  createSpecificationResponse: createSpecificationResponseSchema,
};
