import { ensureAdmin } from '../../api/middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../../api/middlewares/EnsureAuthenticated';
import { IRouteProps } from '../../api/routes';
import { createRentalController } from './adapters/controllers/CreateRentalController';

const routes: IRouteProps[] = [
  {
    method: 'post',
    path: '/rentals',
    handlers: [ensureAuthenticated, ensureAdmin, createRentalController],
  },
];

export default routes;
