import { Request, Response } from 'express';
import { z } from 'zod';
import { MakeListCheckinHistoryUseCase } from '../../factories/makeListCheckinHistoryUseCase';

export class ListCheckinHistoryController {
	async handle(request: Request, response: Response) {
		const user_id = request.user_id;

		const listCheckinHistoryQueryScheme = z.object({
			page: z.coerce.number().default(1)
		});

		const { page } = listCheckinHistoryQueryScheme.parse(request.query);

		const makeListCheckinHistoryUseCase = MakeListCheckinHistoryUseCase();

		const { userCheckIns } = await makeListCheckinHistoryUseCase.execute({
			user_id,
			page
		});

		return response.status(200).json(userCheckIns);
	}
}