import AppConfig from '../../api/config/App';

type ErrorProps = {
  type: 'DatabaseError' | 'DefaultError';
  error: Error;
};

export const logger = (data: ErrorProps) => {
  const fullError = {
    errorType: data.type,
    messageError: data.error.message,
    errorName: data.error.name,
  };
  if (AppConfig.TEST !== true) {
    console.log(
      `[${new Date().toISOString()}]`,
      `Error in server \n`,
      fullError,
    );
  }
};
