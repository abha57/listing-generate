import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status;
    const message = error.message;
    response.status(status).send({
        status,
        message
    });
};

export default errorMiddleware;