import AppConfig from '../../config/App';

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
  if (AppConfig.TEST !== true) {
    console.log(`Error in server \n`, fullError);
  }
};
