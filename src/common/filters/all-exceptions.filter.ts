import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status: number;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception.toJSON) {
      status = Number(exception.toJSON().message.match(/\d+/));
    } else {
      HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(exception);
  }
}
