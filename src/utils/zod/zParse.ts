import { type AnyZodObject, ZodError, type z } from "zod";
import badRequestError from "../../errors/badRequest";

export async function zParse<T extends AnyZodObject>(
	schema: T,
	req: any,
): Promise<z.infer<T>> {
	try {
		return await schema.parseAsync(req);
	} catch (error) {
		if (error instanceof ZodError) {
			const messages = error.issues.map((issue) => issue.message);
			throw new badRequestError(messages.join(", "));
		}
		throw new badRequestError("Erro inesperado");
	}
}
