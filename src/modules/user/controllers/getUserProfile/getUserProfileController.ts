import { Request, Response } from 'express';
import { makeGetUsersProfileUseCase } from '../../factories/makeGetUsersProfileUseCase';


export class GetUserProfileController {
	async handle(request: Request, response: Response) {
		const user_id = request.user_id;

		const getUsersProfileUseCase = makeGetUsersProfileUseCase();

		const { user } = await getUsersProfileUseCase.execute({user_id});

		return response.status(200).json(user);
	}
}