import { AppError } from '@/utils/errors';
import { Decimal } from '@prisma/client/runtime/library';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { InMemoryGymsRepository } from '@/modules/gym/repositories/InMemoryRepository/inMemoryGymsRepository';
import { InMemoryCheckinsRepository } from '../../repositories/inMemoryRepository/inMemoryCheckinsRepository';
import { CheckinUseCase } from './checkinUseCase';

let checkinsRepository: InMemoryCheckinsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkinUseCase: CheckinUseCase;

describe('Checkin Use Case', () => {
	beforeEach( async () => {
		checkinsRepository = new InMemoryCheckinsRepository;
		gymsRepository = new InMemoryGymsRepository;
		checkinUseCase = new CheckinUseCase(checkinsRepository, gymsRepository);

		await gymsRepository.create({
			id: 'gym-id',
			title: 'Gym 1',
			description: '',
			phone: '',
			latitude: -23.4506127,
			longitude: -46.5451525,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to checkin', async () => {

		const { checkin } = await checkinUseCase.execute({
			user_id: 'user-id',
			gym_id: 'gym-id',
			userLatitude: -23.4506127,
			userLongitude: -46.5451525
		});

		expect(checkin.id).toEqual(expect.any(String));
	});

	it('should not be able to checkin in same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
		await checkinUseCase.execute({
			user_id: 'user-id',
			gym_id: 'gym-id',
			userLatitude: -23.4506127,
			userLongitude: -46.5451525
		});
    
		await expect(() => 
			checkinUseCase.execute({
				user_id: 'user-id',
				gym_id: 'gym-id',
				userLatitude: -23.4506127,
				userLongitude: -46.5451525
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to checkin in different days', async () => {  
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));  
		await checkinUseCase.execute({
			user_id: 'user-id',
			gym_id: 'gym-id',
			userLatitude: -23.4506127,
			userLongitude: -46.5451525
		});
		
		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

		const {checkin} = await checkinUseCase.execute({
			user_id: 'user-id',
			gym_id: 'gym-id',
			userLatitude: -23.4506127,
			userLongitude: -46.5451525
		});

		expect(checkin.id).toEqual(expect.any(String));
	});

	it('should not be able to check in on distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym-id-2',
			title: 'Gym 1',
			description: '',
			phone: '',
			latitude: new Decimal(-23.467974),
			longitude: new Decimal(-46.5166138),
		});

		await expect(() => 
			checkinUseCase.execute({
				user_id: 'user-id',
				gym_id: 'gym-id-2',
				userLatitude: -23.4506127,
				userLongitude: -46.5451525
			}),
		).rejects.toBeInstanceOf(AppError);
	});

});
