import { Either, IRepositoryError } from './interfaces';

export const createRepositorySuccess = <S>(
  data: S,
): Either<S, IRepositoryError> => {
  return {
    data,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createRepositoryError = <S>(
  error: IRepositoryError,
): Either<S, IRepositoryError> => {
  return {
    data: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
