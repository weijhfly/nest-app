import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse() || '系统繁忙，请稍后再试';

    const message =
      (exceptionResponse as { message: string[] })?.message?.toString() ??
      exceptionResponse;

    response.status(code).json({
      data: null,
      code,
      message,
      success: false,
    });
  }
}
