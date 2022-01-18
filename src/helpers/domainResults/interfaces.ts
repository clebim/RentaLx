export type IRepositoryError = {
  message: string;
  repository: string;
};

export type IUseCaseError = {
  statusCode: 400 | 404 | 409;
  message: string;
};

export type Either<S, F> = {
  data: S | null;
  isSuccess: boolean;
  isFailure: boolean;
  error: F | null;
};
