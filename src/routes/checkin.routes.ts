import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { CreateCheckinController } from '@/modules/checkin/controllers/createCheckin/createCheckinController';
import { GetUserCheckinController } from '@/modules/checkin/controllers/getUserCheckin/getUserCheckinController';
import { ListCheckinHistoryController } from '@/modules/checkin/controllers/listCheckinHistory/listCheckinHistoryController';
import { ValidateCheckinController } from '@/modules/checkin/controllers/validateCheckin/validateCheckinController';
import { Router } from 'express';


export const checkinRoutes = Router();
checkinRoutes.use(isAuthenticated);

checkinRoutes.post('/gyms/:gymId/checkin', new CreateCheckinController().handle);
checkinRoutes.get('/checkins/count', new GetUserCheckinController().handle);
checkinRoutes.get('/checkins/history/page', new ListCheckinHistoryController().handle);
checkinRoutes.patch('/checkins/:checkinId/validate', new ValidateCheckinController().handle);