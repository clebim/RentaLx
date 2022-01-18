import { Either, IServiceError } from './interfaces';

export const createUseCaseSuccess = <S>(data: S): Either<S, IServiceError> => {
  return {
    data,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createUseCaseError = (
  error: IServiceError,
): Either<null, IServiceError> => {
  return {
    data: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
