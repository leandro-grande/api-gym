import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { AuthenticateController } from '@/modules/user/controllers/authenticate/authenticateController';
import { CreateUserController } from '@/modules/user/controllers/createUser/createUserController';
import { GetUserProfileController } from '@/modules/user/controllers/getUserProfile/getUserProfileController';
import { RefreshTokenController } from '@/modules/user/controllers/refreshToken/refreshTokenController';
import { Router } from 'express';

export const userRoutes = Router();


userRoutes.post('/users', new CreateUserController().handle);
userRoutes.post('/sessions', new AuthenticateController().handle);
userRoutes.patch('/token/refresh', new RefreshTokenController().handle);

// Authenticated
userRoutes.get('/me', isAuthenticated, new GetUserProfileController().handle);
