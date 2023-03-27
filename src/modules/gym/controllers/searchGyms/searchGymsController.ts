import { Request, Response } from 'express';
import { z } from 'zod';
import { MakeSearchManyGymsUseCase } from '../../factories/makeSearchManeGymsUseCase';


export class SearchGymsController {
	async handle(request: Request, response: Response) {
		const searchGymsQuerySchema = z.object({
			query: z.coerce.string(),
			page: z.coerce.number().min(1).default(1),
		});

		const { query, page } = searchGymsQuerySchema.parse(request.query);

		const searchGymsUseCase = MakeSearchManyGymsUseCase();

		const { gyms } = await searchGymsUseCase.execute({
			query,
			page
		});

		return response.status(200).json(gyms);
	}
}