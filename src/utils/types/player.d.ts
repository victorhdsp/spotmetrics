import type { Player as OPlayer, Skill as OSkill } from "@prisma/client";
import { z } from "zod";

interface ISkill extends Pick<OSkill, "power" | "speed" | "dribble"> {
	dribble?: number | null;
}
export type Skill = ISkill;
export type PartialSkill = Parcial<Skill>;

interface IPlayerDefault extends Omit<OPlayer, "skillId"> {
	username?: string | null;
	createdAt?: Date;
	skills: Skill;
}
interface IPlayerParcial extends Partial<IPlayerDefault> {
	skills?: PartialSkill;
}

export type PlayerResumed = Required<Omit<IPlayerDefault, "skills">>;
export type PlayerComplete = Required<IPlayerDefault>;
export type PlayerCreateInput = Omit<IPlayerDefault, "id">;
export type PlayerChangeInput = IPlayerParcial;
