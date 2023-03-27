import { Request, Response } from 'express';
import { z } from 'zod';
import { MakeListNearGymsUseCase } from '../../factories/makeListNearGymsUseCase';


export class ListNearByGymsController {
	async handle(request: Request, response: Response) {
		const listNearByGymsSchemeBody = z.object({
			latitude: z.coerce.number().refine(value => {
				return Math.abs(value) <= 90;
			}),    
			longitude: z.coerce.number().refine(value => {
				return Math.abs(value) <= 180;
			})
		});

		const { latitude, longitude } = listNearByGymsSchemeBody.parse(request.query);

		const listNearByGymsUseCase = MakeListNearGymsUseCase();

		const { gyms } = await listNearByGymsUseCase.execute({
			userLatitude: latitude,
			userLongitude: longitude
		});

		return response.status(200).json(gyms);
	}

}