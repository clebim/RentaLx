import { Either, IServiceError } from './interfaces';

export const createServiceSuccess = <S>(value: S): Either<S, IServiceError> => {
  return {
    value,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createServiceError = <S>(
  error: IServiceError,
): Either<S, IServiceError> => {
  return {
    value: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
