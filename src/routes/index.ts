import { Router } from 'express';
import { checkinRoutes } from './checkin.routes';
import { gymRoutes } from './gym.routes';
import { userRoutes } from './user.routes';

export const routes = Router();

routes.use(userRoutes);
routes.use(checkinRoutes);
routes.use(gymRoutes);