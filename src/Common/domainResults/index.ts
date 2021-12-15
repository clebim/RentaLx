export type IRepositoryError = {
  message: string;
};

export type IServiceError = {
  statusCode: 400 | 404 | 409;
  message: string;
};

export type Either<S, F> = {
  value: S | null;
  isSuccess: boolean;
  isFailure: boolean;
  error: F | null;
};
