type ErrorProps = {
  type: 'RepositotyError' | 'ServiceError' | 'ControllerError';
  error: Error;
};

export const logger = (data: ErrorProps) => {
  const fullError = {
    errorType: data.type,
    messageError: data.error.message,
    errorName: data.error.name,
    dateTime: new Date(),
  };
  console.log('Error in application \n', fullError);
  console.error(data.error);
};
