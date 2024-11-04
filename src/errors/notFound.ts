import type { IError } from "../utils/types/error";

class notFoundError extends Error implements IError {  
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'notFound';
        this.statusCode = 404;
    }
}

export default notFoundError;