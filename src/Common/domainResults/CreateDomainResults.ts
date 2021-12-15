import { IDomainResult } from './index';

export const createDomainResult = <S, F>(
  value: S | F,
  isError: boolean,
): IDomainResult<S, F> => {
  if (isError) {
    return {
      value: null,
      isSuccess: false,
      isFailure: true,
      error: value as F,
    };
  }

  return {
    value: value as S,
    isSuccess: true,
    isFailure: false,
    error: null,
  };
};
