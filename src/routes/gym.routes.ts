import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { verifyUserRole } from '@/middlewares/verifyUserRole';
import { createGymController } from '@/modules/gym/controllers/createGym/createGymController';
import { ListNearByGymsController } from '@/modules/gym/controllers/listNearByGyms/listNearByGymsController';
import { SearchGymsController } from '@/modules/gym/controllers/searchGyms/searchGymsController';
import { Router } from 'express';

export const gymRoutes = Router();
gymRoutes.use(isAuthenticated);

gymRoutes.post('/gyms', verifyUserRole('ADMIN'), new createGymController().handle);
gymRoutes.get('/gyms/search', new SearchGymsController().handle);
gymRoutes.get('/gyms/nearby', new ListNearByGymsController().handle);