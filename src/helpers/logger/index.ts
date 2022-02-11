import { format } from 'date-fns-tz';

import AppConfig from '../../api/config/App';

type ErrorProps = {
  type: 'DatabaseError' | 'DefaultError' | 'FatalError';
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
      `[${format(new Date(), 'dd/MM/yyyy HH:mm:ss', {
        timeZone: 'America/Sao_Paulo',
      })}]`,
      `Error in server \n`,
      fullError,
    );
  }
};
