import { Either, IRepositoryError } from './interfaces';

export const createRepositorySuccess = <S>(
  data: S,
): Either<IRepositoryError, S> => {
  return {
    data,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createRepositoryError = (
  error: IRepositoryError,
): Either<IRepositoryError, null> => {
  return {
    data: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
