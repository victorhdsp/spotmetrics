import { describe, expect, test } from "@jest/globals";
import request from "supertest";
const api = request("http://localhost:3000");

describe("<post> na API de /players", () => {
    test("todas as informações, deve retornar um jogador", async () => {
        const data = {
            name: "fulano",
            username: "fulano x",
            skills: {
                power: 6,
                speed: 5,
                dribble: 3
            }
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual(data.name);
        expect(response.body.username).toEqual(data.username);
        expect(response.body.skills.power).toEqual(data.skills.power);
        expect(response.body.skills.speed).toEqual(data.skills.speed);
        expect(response.body.skills.dribble).toEqual(data.skills.dribble);
    });

    test("somente as informações mandatórias, deve retornar um jogador", async () => {
        const data = {
            name: "ciclano",
            skills: {
                power: 4,
                speed: 2,
            }
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual(data.name);
        expect(response.body.username).toEqual(null);
        expect(response.body.skills.power).toEqual(data.skills.power);
        expect(response.body.skills.speed).toEqual(data.skills.speed);
        expect(response.body.skills.dribble).toEqual(null);
    });

    test("faltando o nome, deve retornar uma mensagem de erro", async () => {
        const data = {
            skills: {
                power: 4,
                speed: 2,
            }
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(500);
        expect(response.body.message).toEqual("O nome do jogador é obrigatório");
    });
    
    test("faltando as habilidades, deve retornar uma mensagem de erro", async () => {
        const data = {
            name: "fulano"
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(500);
        expect(response.body.message).toEqual("Você precisa passar as habilidades do jogador");
    });
    test("faltando a força nas habilidades, deve retornar uma mensagem de erro", async () => {
        const data = {
            name: "fulano",
            skills: {
                speed: 2,
            }
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(500);
        expect(response.body.message).toEqual("Força precisa ser um número");
    });
    test("faltando a força nas velocidade, deve retornar uma mensagem de erro", async () => {
        const data = {
            name: "fulano",
            skills: {
                power: 4,
            }
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(500);
        expect(response.body.message).toEqual("Velocidade precisa ser um número");
    });
    test("enviando informações mais, deve ignorar os dados extras e retornar um jogador", async () => {
        const data = {
            name: "fulano",
            username: "fulano x",
            skills: {
                power: 6,
                speed: 5,
                dribble: 3
            },
            extra: "extra"
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual(data.name);
        expect(response.body.username).toEqual(data.username);
        expect(response.body.skills.power).toEqual(data.skills.power);
        expect(response.body.skills.speed).toEqual(data.skills.speed);
        expect(response.body.skills.dribble).toEqual(data.skills.dribble);
        expect(response.body.extra).toEqual(undefined);
    });
    test("enviando informações erradas, deve retornar uma mensagem de erro", async () => {
        const data = {
            name: 123,
            skills: {
                power: 6,
                speed: 5,
            },
            extra: "extra"
        }
        const response = await api.post("/v1/players").send(data)
        expect(response.status).toEqual(500);
        expect(response.body.message).toEqual("O nome do jogador é obrigatório");
    });
})