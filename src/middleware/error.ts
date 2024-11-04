import type { NextFunction, Request, Response } from "express";
import type { IError } from "../utils/types/error";

function errorMiddleware(error:IError, req: Request, res: Response, next: NextFunction) {
    const code = error.statusCode || 500;
    const message = error.message;
    res.status(code).json({
        message
    });
}

export default errorMiddleware;