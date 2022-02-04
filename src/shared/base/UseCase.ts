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

export class UseCase {
  public left({
    message,
    statusCode,
  }: IBuildErrorProps): Either<IUseCaseError, null> {
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

  public right<T>(data: T): Either<IUseCaseError, T> {
    return createUseCaseSuccess<T>(data);
  }
}
