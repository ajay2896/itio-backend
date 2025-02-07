import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema:UserSchema}
  ]),

  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_CODE,
    signOptions: { expiresIn: '3600s' },
  }),

  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
