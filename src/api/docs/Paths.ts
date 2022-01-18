import { categoryImportsPaths } from './paths/category/CategoryImportPaths';
import { categoryPaths } from './paths/category/CategoryPaths';
import { specificationPaths } from './paths/specification/SpecificationPaths';

export default {
  '/categories': categoryPaths,
  '/categories/import': categoryImportsPaths,
  '/specifications': specificationPaths,
};
