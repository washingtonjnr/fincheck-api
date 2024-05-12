import { Module } from '@nestjs/common';
// Controllers
import { UsersController } from './users.controller';
// Services
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    // Services
    UsersService,
    JwtService,
  ],
})
export class UsersModule {}
