import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function clearDatabase() {
  let hasPlayers = await prisma.player.count() > 0;
  const hasSkills = await prisma.skill.count() > 0;
  if (hasPlayers)
    await prisma.player.deleteMany();
  hasPlayers = await prisma.player.count() > 0;
  if (!hasPlayers && hasSkills)
    await prisma.skill.deleteMany();
}