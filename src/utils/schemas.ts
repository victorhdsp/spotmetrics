import { z } from "zod";
import { PlayerChangeInput, PlayerCreateInput, Skill, PartialSkill } from "./types";

function skillPowerDefault(name: string) {
    return z
    .number({
        message: `${name} precisa ser um número`
    })
    .min(0, `${name} precisa ser maior ou igual a 0`)
    .max(10, `${name} precisa ser menor ou igual a 10`);
}

const name = z.string().min(3, "Nome precisa ter no mínimo 3 caracteres");
const username = z.string().nullable();
const createdAt = z.date().optional();
const power = skillPowerDefault("Força");
const speed = skillPowerDefault("Velocidade");
const dribble = skillPowerDefault("Drible").nullable();

export const PlayerCreateSchema = z.object({
    name,
    username,
    createdAt,
    skills: z.object({
        power,
        speed,
        dribble
    }) satisfies z.ZodType<Skill>,
}) satisfies z.ZodType<PlayerCreateInput>;

export const PlayerChangeSchema = z.object({
    name: name.optional(),
    username: username.optional(),
    createdAt: createdAt.optional(),
    skills: z.object({
        power: power.optional(),
        speed: speed.optional(),
        dribble: dribble.optional()
    }) satisfies z.ZodType<PartialSkill>,
}) satisfies z.ZodType<PlayerChangeInput>;