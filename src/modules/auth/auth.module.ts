import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// Services
import { AuthService } from './auth.service';
// Controllers
import { AuthController } from './auth.controller';
// Config
import { env } from '../../shared/config/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
