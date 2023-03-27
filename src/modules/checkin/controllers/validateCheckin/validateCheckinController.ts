import { Request, Response } from 'express';
import { MakeValidateUseCase } from '../../factories/makeValidateUseCase';


export class ValidateCheckinController {
	async handle(request: Request, response: Response) {

		const checkinId = request.query.checkinId as string;

		const checkinValidateUseCase = MakeValidateUseCase();

		await checkinValidateUseCase.execute({
			checkin_id: checkinId
		});

		return response.status(204).send();
	}
}