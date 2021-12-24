import { Either, IServiceError } from './interfaces';

export const createServiceSuccess = <S>(data: S): Either<S, IServiceError> => {
  return {
    data,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createServiceError = <S>(
  error: IServiceError,
): Either<S, IServiceError> => {
  return {
    data: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
