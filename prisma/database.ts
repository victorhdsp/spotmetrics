import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function innitialize() {
	// Start prisma
}

innitialize()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

export default prisma;
