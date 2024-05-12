import { Global, Module } from '@nestjs/common';
// Service
import { PrismaService } from './prisma.service';
// Repositories
import { AuthRepository } from './repositories/auth.repositories';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';

@Global()
@Module({
  providers: [
    // Service
    PrismaService,
    // Repositories
    AuthRepository,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
  exports: [
    AuthRepository,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
