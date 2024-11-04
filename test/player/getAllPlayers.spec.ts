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

describe("<get> na API de /players/", () => {
    test("Sem players, deve retornar uma lista vazia", async () => {
        const response = await api.get("/v1/players");
        expect(response.status).toEqual(200);
        expect(response.body.next).toEqual(null);
        expect(response.body.players).toEqual([]);
        expect(response.body.prev).toEqual("http://localhost:3000/v1/players?limit=10&offset=0");
        expect(response.body.total).toEqual(0);
    });
    test("Com players, deve retornar uma lista de players", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        const response = await api.get("/v1/players");
        expect(response.status).toEqual(200);
        expect(response.body.players).toHaveLength(1);
        expect(response.body.players[0].name).toEqual(player.name);
    });
    test.todo("Com players e limite, deve retornar uma lista de players limitada");
    test.todo("Buscar por nome completo, deve retornar uma lista de players filtrada");
    test.todo("Buscar por nome parcial, deve retornar uma lista de players filtrada");
    test.todo("Buscar por apelido completo, deve retornar uma lista de players filtrada");
    test.todo("Buscar por apelido parcial, deve retornar uma lista de players filtrada");
});