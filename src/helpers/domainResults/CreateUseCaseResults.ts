import { Either, IUseCaseError } from './interfaces';

export const createUseCaseSuccess = <S>(data: S): Either<S, IUseCaseError> => {
  return {
    data,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createUseCaseError = (
  error: IUseCaseError,
): Either<null, IUseCaseError> => {
  return {
    data: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
