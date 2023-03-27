import { Request, Response } from 'express';
import { MakeGetUserCheckinUseCase } from '../../factories/makeGetUserCheckinUseCase';


export class GetUserCheckinController {
	async handle(request: Request, response: Response) {
		const user_id = request.user_id;
    
		const getUserCheckinUseCase = MakeGetUserCheckinUseCase();

		const { checkInsCount } = await getUserCheckinUseCase.execute({
			user_id
		});

		return response.status(200).json(checkInsCount);
	}
}