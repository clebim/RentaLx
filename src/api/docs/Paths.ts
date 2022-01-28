import { CarImagesPaths } from './paths/car/CarImages';
import { carPaths } from './paths/car/CarPaths';
import { CarSpecificationPaths } from './paths/car/CarSpecification';
import { categoryImportsPaths } from './paths/category/CategoryImportPaths';
import { categoryPaths } from './paths/category/CategoryPaths';
import { sessionPaths } from './paths/session/SessionPaths';
import { specificationPaths } from './paths/specification/SpecificationPaths';
import { UserAvatarPaths } from './paths/user/UserAvatar';
import { userPaths } from './paths/user/UserPaths';

export default {
  '/api/session': sessionPaths,
  '/api/users': userPaths,
  '/api/users/avatar': UserAvatarPaths,
  '/api/categories': categoryPaths,
  '/api/categories/import': categoryImportsPaths,
  '/api/specifications': specificationPaths,
  '/api/cars': carPaths,
  '/api/cars/specifications/:carId': CarSpecificationPaths,
  '/api/cars/images/:carId': CarImagesPaths,
};
