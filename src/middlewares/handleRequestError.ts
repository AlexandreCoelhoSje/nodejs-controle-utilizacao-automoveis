import { NextFunction, Request, Response } from "express";

/**
 * This middleware catches errors thrown by the application and returns the appropriate response
 */
export function handleRequestError(err: Error, request: Request, response: Response, next: NextFunction) {

    if (err instanceof Error) {
        return response.status(400).json({ 
            error: err.message 
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
}