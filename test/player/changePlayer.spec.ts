import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import type { PlayerComplete } from "../../src/utils/types/player";
const api = request("http://localhost:3000");

const data = {
    name: "ciclano",
    skills: {
        power: 4,
        speed: 2,
    }
}

describe("<put> na API de /players/:id", () => {
    test("com um id válido e modificando campo mandatório, deve retornar um jogador", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        expect(player.name).toEqual(data.name);
        const response = await api.put(`/v1/players/${player.id}`).send({ name: "fulano" });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual("fulano");
    });

    test("com um id válido e modificando campo opcional, deve retornar um jogador", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        expect(player.name).toEqual(data.name);
        const response = await api.put(`/v1/players/${player.id}`).send({ username: "fulano x" });
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual("fulano x");
    });

    test("com um id válido e modificando habilidades, deve retornar um jogador", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        expect(player.name).toEqual(data.name);
        const response = await api.put(`/v1/players/${player.id}`).send({ skills: { power: 10 } });
        expect(response.status).toEqual(200);
        expect(response.body.skills.power).toEqual(10);
    });
    
    test("com um id inválido, deve retornar uma mensagem de erro", async () => {
        const response = await api.put("/v1/players/0");
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("Jogador não encontrado");
    });
});