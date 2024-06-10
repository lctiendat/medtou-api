import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx :HttpArgumentsHost = host.switchToHttp();
        const response: any = ctx.getResponse();
        const request: any = ctx.getRequest();
        const status : number =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message: any =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception;

        const errorResponse = {
            status: false,
            data: null,
            message: message?.message,
        };

        this.logger.error(
            `HTTP Status: ${status} Error Message: ${JSON.stringify(message)}`,
        );

        response.status(status).json(errorResponse);
    }
}
