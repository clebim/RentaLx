import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import { getConn } from '../index';

const createAdmin = async () => {
  const connection = getConn();

  const id = v4();
  const password = await hash('asdfghjkl', 8);

  await connection.query(
    ` INSERT INTO USERS(id, name, email, password, is_admin, driver_license ,created_at, updated_at)
      VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'abcde' ,'now()', 'now()')
    `,
  );
};

export default async () => {
  await createAdmin()
    .then(() => console.log('User admin created!'))
    .catch(error =>
      console.log('Error in run Seed CreateAdmin', error.message),
    );
};
