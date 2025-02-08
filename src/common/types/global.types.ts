import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    emailId: string;
    isAdmin: boolean;
    userType: string;
    _id: string;
  };
}
