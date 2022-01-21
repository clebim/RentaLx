/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultError } from './DefaultError';

export class HttpError extends DefaultError {
  public statusCode: number = null;

  public report = null;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    report: any,
    error?: Error,
    title?: string,
  ) {
    super(message, errorCode, error, title);

    this.statusCode = statusCode;
    this.report = report?.response ? { ...report.response } : report;
  }
}
