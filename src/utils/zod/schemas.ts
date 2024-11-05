import { z } from "zod";
import type {
	PartialSkill,
	PlayerChangeInput,
	PlayerCreateInput,
	Skill,
} from "../types/player";

function skillPowerDefault(name: string) {
	return z
		.number({
			message: `${name} precisa ser um número`,
		})
		.min(0, `${name} precisa ser maior ou igual a 0`)
		.max(10, `${name} precisa ser menor ou igual a 10`);
}

const name = z.string({
	message: "O nome do jogador é obrigatório",
});
const username = z.string().nullable().optional();
const createdAt = z.date().optional();
const dribble = skillPowerDefault("Drible").nullable().optional();
const power = skillPowerDefault("Força");
const speed = skillPowerDefault("Velocidade");

const SkillCreateSchema = z.object(
	{
		power,
		speed,
		dribble,
	},
	{
		message: "Você precisa passar as habilidades do jogador",
	},
) satisfies z.ZodType<Skill>;

export const PlayerCreateSchema = z.object({
	name,
	username,
	createdAt,
	skills: SkillCreateSchema,
}) satisfies z.ZodType<PlayerCreateInput>;

const SkillChangeSchema = z.object(
	{
		power: power.optional(),
		speed: speed.optional(),
		dribble: dribble.optional(),
	},
	{
		message: "Você precisa passar as habilidades do jogador",
	},
) satisfies z.ZodType<PartialSkill>;

export const PlayerChangeSchema = z.object({
	name: name.optional(),
	username: username,
	createdAt: createdAt.optional(),
	skills: SkillChangeSchema.optional(),
}) satisfies z.ZodType<PlayerChangeInput>;
