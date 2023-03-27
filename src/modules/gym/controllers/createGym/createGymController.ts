import { MakeCreateGymsUseCase } from '@/modules/gym/factories/makeCreateGymsUseCase';
import { Request, Response } from 'express';
import { z } from 'zod';


export class createGymController {
	async handle(request: Request, response: Response) {
		const createGymUseSchemeBody = z.object({
			title: z.string(),       
			description: z.string().nullable(),
			phone: z.string().nullable(),
			latitude: z.number().refine(value => {
				return Math.abs(value) <= 90;
			}),    
			longitude: z.number().refine(value => {
				return Math.abs(value) <= 180;
			}),    
		});

		const { 
			title, 
			description, 
			phone, 
			latitude, 
			longitude 
		} = createGymUseSchemeBody.parse(request.body);

		const createGymUseCase = MakeCreateGymsUseCase();

		const { gym } = await createGymUseCase.execute({
			title,
			description,
			phone,
			latitude,
			longitude
		});

		return response.status(201).json(gym);
	}
}