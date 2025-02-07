import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDTO } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async registrationService(body: RegistrationDTO) {
        const {  password,mobileNumber,isAdmin } = body;

        // Check mobile Number Exist or not
        let isMobileExist = await this.userModel.findOne({ mobileNumber });
    
        if (isMobileExist) {
            throw new ConflictException('This mobile number id already exists, please use another mobile number');
        }
    
    
        // Hash Password
        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);
    
        // Create new user
        let createUser = await this.userModel.create({
            password: hashPassword,
            isAdmin: isAdmin,
            userType: isAdmin == true ? 'admin': 'user',
            mobileNumber: mobileNumber
        });

        if(!createUser) throw new InternalServerErrorException("Something goes wrong, Please try after sometime");

        console.log("---pass", process.env.JWT_SECRET_CODE)
    
        return {
            success: true,
            message: "Successfully created..."
        };
    }

    async loginService(body: LoginDTO) {
        const { emailId, password } = body;

        // Check user exists or not in database
        let user = await this.userModel.findOne({ emailId });

        if (!user) throw new UnauthorizedException('Invalid email or password');

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

        // Generate JWT Token
        const payload = { emailId: user.mobileNumber, isAdmin:user.isAdmin, userType: user.userType, _id: user._id };

        

        const jwtToken = this.jwtService.sign(payload);

        return { jwtToken };
    }
    


}
