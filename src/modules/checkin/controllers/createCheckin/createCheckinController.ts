import { Request, Response } from 'express';
import { z } from 'zod';
import { MakeCheckinUseCase } from '@/modules/checkin/factories/makeCheckinUseCase';


export class CreateCheckinController {
	async handle(request: Request, response: Response) {
		const userId = request.user_id;

		const createCheckInParamsScheme = z.object({
			gymId: z.string(),
		});

		const createCheckinSchemeBody = z.object({
			latitude: z.coerce.number().refine(value => {
				return Math.abs(value) <= 90;
			}),    
			longitude: z.coerce.number().refine(value => {
				return Math.abs(value) <= 180;
			}),  
		});
    
		const { latitude, longitude } = createCheckinSchemeBody.parse(request.body);
		const { gymId } = createCheckInParamsScheme.parse(request.params);

		const checkinUseCase = MakeCheckinUseCase();

		const { checkin } = await checkinUseCase.execute({
			user_id: userId,
			gym_id: gymId,
			userLatitude: latitude,
			userLongitude: longitude
		});

		return response.status(201).json(checkin);
	}
}