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

  public buildError({
    error,
    message,
  }: IBuildErrorProps): Either<null, IRepositoryError> {
    logger({
      type: 'DatabaseError',
      error,
    });
    return createRepositoryError({
      message,
      repository: this.repositoryName,
    });
  }

  public buildSuccess<T>(data: T): Either<T, IRepositoryError> {
    return createRepositorySuccess<T>(data);
  }
}
