import { NextFunction, Request, Response } from 'express';


export function verifyUserRole( roleToVerify: 'ADMIN' | 'MEMBER' ) {
	return (request: Request, response: Response, next: NextFunction) => {
		const role = request.role; 
     
		if (role !== roleToVerify) {
			return response.status(401).send({ message: 'Unauthorized' });
		}

		next();
	};
}