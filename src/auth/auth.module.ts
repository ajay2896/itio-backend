import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_CODE || 'default_secret',
      signOptions: { expiresIn: '3600s' },
    })

  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
