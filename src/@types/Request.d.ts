/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    userPayloadData: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  }
}
