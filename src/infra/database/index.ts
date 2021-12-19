import { createConnection, getConnection } from 'typeorm';

export const startConnection = async () => {
  await createConnection('default')
    .then(() => console.log('Database connection started.'))
    .catch(err => {
      console.log(err);
      throw err;
    });
};
export const getConn = () => getConnection('default');
export const closeConnection = () => getConnection('default').close();
