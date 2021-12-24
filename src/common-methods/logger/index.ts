type ErrorProps = {
  type: 'DatabaseError' | 'DefaultError';
  error: Error;
  fileName: string;
};

export const logger = (data: ErrorProps) => {
  const fullError = {
    errorType: data.type,
    messageError: data.error.message,
    errorName: data.error.name,
    dateTime: new Date(),
  };
  console.log(`Error in ${data.fileName} \n`, fullError);
  console.error(data.error);
};
