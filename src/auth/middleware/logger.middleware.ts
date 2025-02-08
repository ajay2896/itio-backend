import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JWT_CONSTANTS } from '../constants/jwt.constant';

dotenv.config();

@Injectable()
export class LoggerMiddleware implements NestMiddleware {


  async use(req: Request, res: Response, next: NextFunction) {


    console.log('--- Global Middleware START ---');

    try {
      const authHeader = req.headers.authorization;


      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token is missing or invalid');
      }

      const token = authHeader.split(' ')[1];

      console.log("------1------",token)

      // Verify JWT
      const decodedData = jwt.verify(token, JWT_CONSTANTS.JWT_SECRET_KEY);

      console.log('------ 2----', decodedData);

      // Attach user details to the request
      req['user'] = decodedData;

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
