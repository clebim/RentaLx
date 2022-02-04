import { Either, IUseCaseError } from './interfaces';

export const createUseCaseSuccess = <S>(data: S): Either<IUseCaseError, S> => {
  return {
    data,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};

export const createUseCaseError = (
  error: IUseCaseError,
): Either<IUseCaseError, null> => {
  return {
    data: null,
    isSuccess: false,
    isFailure: true,
    error,
  };
};
