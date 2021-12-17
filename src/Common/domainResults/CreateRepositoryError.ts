import { Either, IRepositoryError } from './interfaces';

export const createRepositorySuccess = <S>(
  value: S,
): Either<S, IRepositoryError> => {
  return {
    value,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createRepositoryError = <S>(
  error: IRepositoryError,
): Either<S, IRepositoryError> => {
  return {
    value: null,
    isSuccess: true,
    isFailure: false,
    error,
  };
};
