import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware<T>(type:any, skipMissingProperties = false): RequestHandler {
    return ( req, res, next ) => {
        validate(plainToClass(type, req.body), { skipMissingProperties }).then( (errors: ValidationError[]) => {
            if(errors.length > 0){
                const errorMessagesArr = errors.map( (error: ValidationError) => Object.values(error.constraints).join(', ') );
                const errorMessages = errorMessagesArr[0];
                next(new HttpException(400, errorMessages));
            } else {
                next();
            }
        })
    }
}
export default validationMiddleware;