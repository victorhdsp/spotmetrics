import type { Request } from "express";
import { z } from "zod";
import playerService from "../../service/playerService";
import type { PlayerComplete } from "../../utils/types/player";
import { zParse } from "../../utils/zod/zParse";

export interface OutputCreateTeams {
	team1: PlayerComplete[];
	team2: PlayerComplete[];
}

export interface CreateTeamsParams {
	size?: number;
}

const CreateTeamsSchema = z.object({
	size: z
		.number()
		.min(5, "O time não pode ser menor que 5 jogadores por time."),
}) satisfies z.ZodType<CreateTeamsParams>;

async function createTeams(req: Request): Promise<OutputCreateTeams> {
	const params: Required<CreateTeamsParams> = {
		size: Number(`${req.query.limit || 5}`),
	};
	const resolvedParams = await zParse(CreateTeamsSchema, params);
	const players = await playerService.createTeams(resolvedParams);
	return players;
}

export default createTeams;
