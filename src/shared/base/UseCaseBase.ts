import {
  createUseCaseError,
  createUseCaseSuccess,
} from '../../helpers/domainResults/CreateUseCaseResults';
import { Either, IUseCaseError } from '../../helpers/domainResults/interfaces';
import { logger as loggerHelper } from '../../helpers/logger';

type IBuildErrorProps = {
  message: string;
  statusCode: 400 | 409 | 404;
};

type ILoggerProps = {
  error: Error;
  type: 'DatabaseError' | 'DefaultError' | 'FatalError';
};

export class UseCaseBase {
  public buildError({
    message,
    statusCode,
  }: IBuildErrorProps): Either<null, IUseCaseError> {
    return createUseCaseError({
      message,
      statusCode,
    });
  }

  public logger({ error, type }: ILoggerProps): void {
    loggerHelper({
      error,
      type,
    });
  }

  public buildSuccess<T>(data: T): Either<T, IUseCaseError> {
    return createUseCaseSuccess<T>(data);
  }
}
