import { IDomainResult } from './index';

export const createDomainResult = <S, F>(
  value: S | F,
  isError: boolean,
): IDomainResult<S, F> => {
  return {
    value: isError ? null : (value as S),
    isSuccess: !isError,
    isFailure: isError,
    error: isError ? (value as F) : null,
  };
};
