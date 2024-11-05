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

const data2 = {
    ...data,
    username: "ciclano123"
}

describe("<get> na API de /players/", () => {
    test("Sem players, deve retornar uma lista vazia", async () => {
        const response = await api.get("/v1/players");
        expect(response.status).toEqual(200);
        expect(response.body.next).toEqual(null);
        expect(response.body.players).toEqual([]);
        expect(response.body.prev).toEqual(null);
        expect(response.body.total).toEqual(0);
    });
    test("Com players, deve retornar uma lista de players", async () => {
        await api.post("/v1/players").send(data);
        const response = await api.get("/v1/players");
        expect(response.status).toEqual(200);
        expect(response.body.players.length).toBeGreaterThanOrEqual(1)
    });
    test("Com players e limite, deve retornar uma lista de players limitada", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        (await api.post("/v1/players").send(data)).body;
        const response = await api.get("/v1/players?limit=1");
        expect(response.status).toEqual(200);
        expect(response.body.players).toHaveLength(1);
        expect(response.body.players[0].name).toEqual(player.name);
    });
    test("Buscar por nome completo, deve retornar uma lista de players filtrada", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        const response = await api.get(`/v1/players?name=${data.name}`);
        expect(response.status).toEqual(200);
        expect(response.body.players[0].name).toEqual(player.name);
    });
    test("Buscar por nome parcial, deve retornar uma lista de players filtrada", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data)).body;
        const response = await api.get(`/v1/players?name=${data.name.slice(0, 3)}`);
        expect(response.status).toEqual(200);
        expect(response.body.players[0].name).toEqual(player.name);
    });
    test("Buscar por apelido completo, deve retornar uma lista de players filtrada", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data2)).body;
        const response = await api.get(`/v1/players?username=${data2.username}`);
        expect(response.status).toEqual(200);
        expect(response.body.players[0].username).toEqual(player.username);
    });
    test("Buscar por apelido parcial, deve retornar uma lista de players filtrada", async () => {
        const player: PlayerComplete = (await api.post("/v1/players").send(data2)).body;
        const response = await api.get(`/v1/players?username=${data2.username.slice(0, 3)}`);
        expect(response.status).toEqual(200);
        expect(response.body.players[0].username).toEqual(player.username);
    });
});