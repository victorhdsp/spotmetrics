import { Player as OPlayer, Skill as OSkill } from "@prisma/client";
import { z } from "zod";

export type Skill = Pick<OSkill, "power" | "speed" | "dribble">
export type PartialSkill = Parcial<Skill>;

interface IPlayerDefault extends Omit<OPlayer, "skillId"> {
    createdAt?: Date
    skills: Skill
}
interface IPlayerParcial extends Parcial<Omit<OPlayer, "skillId">> {
    skills: PartialSkill
}

export type PlayerResumed = Required<Omit<IPlayerDefault, "skills">>
export type PlayerComplete = Required<IPlayerDefault>
export type PlayerCreateInput = Omit<IPlayerDefault, "id">
export type PlayerChangeInput = IPlayerParcial