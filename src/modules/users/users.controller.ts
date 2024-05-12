import { Controller, Get } from '@nestjs/common';
// Services
import { UsersService } from './users.service';
// Decorators
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  // ActiveUserId is a decorator that check and return the userId
  me(@ActiveUserId() userId: string) {
    return this.usersService.findOne(userId);
  }
}
