import type { Express } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export function startSwagger(app: Express, PORT: number) {
	const swaggerOptions = {
		swaggerDefinition: {
			openapi: "3.0.0",
			info: {
				title: "API CRUD de Jogadores de Futebol",
				version: "1.0.0",
				description:
					"Documentação da API para o projeto de CRUD de jogadores de futebol",
				contact: {
					name: "Victor Hugo de Souza Pereira",
					email: "victorhugods.pereira@gmail.com",
				},
			},
			servers: [
				{
					url: `http://localhost:${PORT}`,
					description: "Servidor de Desenvolvimento",
				},
			],
		},
		apis: ["./src/routes/*.ts"],
	};
	const swaggerDocs = swaggerJsDoc(swaggerOptions);

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
