import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenExpiredError } from "@nestjs/jwt";
import { JWT_CONSTANTS } from "../constants/jwt.constant";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor() {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.JWT_SECRET_KEY,
        });
    }

    validate(payload:any) { 
        try {

            console.log("------- JWT Stategy  -----");

            return payload;


        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException("Your session expire, Please login again....");
            }
            throw error;
        }
    }

}