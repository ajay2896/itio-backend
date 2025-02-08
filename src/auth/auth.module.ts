import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JWT_CONSTANTS } from './constants/jwt.constant';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_CONSTANTS.JWT_EXPIRY },
    })

  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
