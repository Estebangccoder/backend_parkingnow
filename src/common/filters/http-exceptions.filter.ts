import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object' && errorResponse !== null) {
        message = (errorResponse as any).message || JSON.stringify(errorResponse);
      }

      if (status === HttpStatus.UNAUTHORIZED) {
        message = 'Unauthorized access';
      } else if (status === HttpStatus.FORBIDDEN) {
        message = 'Forbidden resource';
      }

    } else if (exception instanceof QueryFailedError) {
      if ((exception as any).code === 'ER_DUP_ENTRY') {
        status = HttpStatus.CONFLICT;
        message = 'Duplicate entry detected';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = 'Database query failed';
      }

    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = 'Entity not found';

    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception instanceof Error ? exception.message : 'An unknown error occurred';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
