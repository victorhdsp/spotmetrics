import type { IError } from "../utils/types/error";

class badRequestError extends Error implements IError {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.name = "badRequest";
		this.statusCode = 400;
	}
}

export default badRequestError;
