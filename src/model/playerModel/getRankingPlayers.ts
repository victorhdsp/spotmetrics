import prisma from "../../../prisma/database";

type Output = Promise<
    {
        id: string;
        name: string;
        username: string | null;
        createdAt: Date;
        skills: {
            power: number;
            speed: number;
            dribble: number | null;
        };
    }[]
>;

async function getRankingPlayers(): Output {
	const players = await prisma.player.findMany({
        select: {
            name: true,
            id: true,
            username: true,
            createdAt: true,
            skills: {
                select: {
                    power: true,
                    speed: true,
                    dribble: true
                }
            }
        }
    });
    const ranking = players.sort((a, b) => {
        const aTotal = a.skills.power + a.skills.speed + (a.skills.dribble || 0);
        const bTotal = b.skills.power + b.skills.speed + (b.skills.dribble || 0);
        return bTotal - aTotal;
    });
	return ranking;
}

export default getRankingPlayers;
