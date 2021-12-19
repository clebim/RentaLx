import { createConnection, getConnection } from 'typeorm';

const nameDb = (process.env.NODE_ENV === 'prod' && 'prod') || 'default';

export const startConnection = async () => {
  await createConnection(nameDb)
    .then(() => console.log('Database connection started.'))
    .catch(err => {
      console.log(err);
      throw err;
    });
};
export const getConn = () => getConnection(nameDb);
export const closeConnection = () => getConnection(nameDb).close();
export default startConnection;
