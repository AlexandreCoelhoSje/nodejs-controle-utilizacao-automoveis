import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function ensureValidation(request: Request, response: Response, next: NextFunction) {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    return next();
}