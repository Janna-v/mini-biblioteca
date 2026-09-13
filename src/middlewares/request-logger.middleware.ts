import type { NextFunction, Request, Response } from "express";

export function requestLoggerMW(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(
        "Request:",
        req.method,
        req.url,
        req.ip
    );

    next();
}