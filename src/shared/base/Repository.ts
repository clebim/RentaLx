import {
  createRepositoryError,
  createRepositorySuccess,
} from '../../helpers/domainResults/CreateRepositoryResults';
import {
  Either,
  IRepositoryError,
} from '../../helpers/domainResults/interfaces';
import { logger } from '../../helpers/logger';

type IBuildErrorProps = {
  error: Error;
  message: string;
};

export class Repository {
  private repositoryName: string;

  constructor(repositoryName: string) {
    this.repositoryName = repositoryName;
  }

  public left({
    error,
    message,
  }: IBuildErrorProps): Either<IRepositoryError, null> {
    logger({
      type: 'DatabaseError',
      error,
    });
    return createRepositoryError({
      message,
      repository: this.repositoryName,
    });
  }

  public right<T>(data: T): Either<IRepositoryError, T> {
    return createRepositorySuccess<T>(data);
  }
}
