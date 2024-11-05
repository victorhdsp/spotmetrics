import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import type { PlayerComplete } from "../../src/utils/types/player";
const api = request("http://localhost:3000");

const data = {
	name: "ciclano",
	skills: {
		power: 4,
		speed: 2,
	},
};

describe("<get> na API de /players/:id", () => {
	test("com um id válido, deve retornar um jogador", async () => {
		const player: PlayerComplete = (await api.post("/v1/players").send(data))
			.body;
		const response = await api.get(`/v1/players/${player.id}`);
		expect(response.status).toEqual(200);
		expect(response.body.name).toEqual(player.name);
		expect(response.body.username).toEqual(null);
		expect(response.body.skills.power).toEqual(player.skills.power);
		expect(response.body.skills.speed).toEqual(player.skills.speed);
		expect(response.body.skills.dribble).toEqual(null);
	});

	test("com um id inválido, deve retornar uma mensagem de erro", async () => {
		const response = await api.get("/v1/players/0");
		expect(response.status).toEqual(404);
		expect(response.body.message).toEqual("Jogador não encontrado");
	});
});
