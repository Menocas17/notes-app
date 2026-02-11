export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

import { Request } from 'express';
export interface RequestWithUser extends Request {
  user: AuthUser;
}
