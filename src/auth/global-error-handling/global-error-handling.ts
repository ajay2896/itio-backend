

import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.log("-----exception----", exception);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage: any = { message: 'Internal server error', success: false };

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            errorMessage = exception.getResponse();
            errorMessage['success'] = false;
        } else if (exception instanceof TokenExpiredError) {
            // Handle token expiry error
            status = HttpStatus.UNAUTHORIZED; // Set status to unauthorized
            errorMessage = { message: 'Your session has expired, Please log in again.', success: false };
        } else if (exception instanceof JsonWebTokenError) {
            // Handle invalid JWT signature error
            status = HttpStatus.UNAUTHORIZED; // Set status to unauthorized
            errorMessage = { message: 'Invalid token, Please log in again.', success: false };
        } else if (exception.message === "jwt must be provided") {
            status = HttpStatus.UNAUTHORIZED; // Set status to unauthorized
            errorMessage = { message: exception.message, success: false };
        }

        console.log("------- 1 ------");

        response.status(status).json(errorMessage);
    }
}
