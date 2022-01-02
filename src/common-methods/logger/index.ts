type ErrorProps = {
  type: 'DatabaseError' | 'DefaultError';
  error: Error;
};

export const logger = (data: ErrorProps) => {
  const fullError = {
    errorType: data.type,
    messageError: data.error.message,
    errorName: data.error.name,
    dateTime: new Date(),
  };
  console.log(`Error in server \n`, fullError);
};
