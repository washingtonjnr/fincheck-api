import { Injectable } from '@nestjs/common';
// DTOs
import { User } from './entities/user.entity';
// Repositories
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(id: string): Promise<User> {
    const user = this.usersRepository.findOne(id);

    return user;
  }
}
