import 'dotenv/config';
import { Environment } from 'vitest';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { prisma } from '@/prisma';

function generateDatabaseURL(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('Please provide a DATABASE_URL environment variable');
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set('schema', schema);

	return url.toString();
}

export default <Environment>{
	name: 'prisma',
	async setup() {
		const schema = randomUUID();
		const dataseURL = generateDatabaseURL(schema);

		process.env.DATABASE_URL = dataseURL;
		execSync('yarn prisma migrate deploy');

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

				await prisma.$disconnect();
			},
		};
	},
};
