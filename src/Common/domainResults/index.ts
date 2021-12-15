export type IRepositoryError = {
  message: string;
};

export type IServiceError = {
  statusCode: 400 | 404 | 409;
  message: string;
};

export type IDomainResult<S, F> = {
  value: S | null;
  isSuccess: boolean;
  isFailure: boolean;
  error: F | null;
};
