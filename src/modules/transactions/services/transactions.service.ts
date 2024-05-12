import { Injectable } from '@nestjs/common';
// DTOs
import { TransactionType } from '../entities/transaction-type.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
// Repositories
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
// Services
import { CheckTransactionExistsService } from './check-transaction-exists.service';
import { CheckCategoryExistsService } from 'src/modules/categories/services/check-category-exists.service';
import { CheckBankAccountExistsService } from 'src/modules/bank-accounts/services/check-bank-account-exists.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly checkTransactionExistsService: CheckTransactionExistsService,
    private readonly checkCategoryExistsService: CheckCategoryExistsService,
    private readonly checkBankAccountExistsService: CheckBankAccountExistsService,
  ) {}
  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { categoryId, bankAccountId } = createTransactionDto;

    await this.checkEntitiesExists({
      userId,
      categoryId,
      bankAccountId,
    });

    const transaction = await this.transactionsRepository.create(
      userId,
      createTransactionDto,
    );

    return transaction;
  }

  async findAll(
    userId: string,
    {
      month,
      year,
      bankAccountId,
      type,
    }: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    const transactions = await this.transactionsRepository.findAll(userId, {
      month,
      year,
      bankAccountId,
      type,
    });

    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.transactionsRepository.findOne(id);

    return transaction;
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { categoryId, bankAccountId } = updateTransactionDto;

    await this.checkTransactionExistsService.check(userId, id);

    await this.checkEntitiesExists({
      userId,
      categoryId,
      bankAccountId,
    });

    const transaction = await this.transactionsRepository.update(
      userId,
      id,
      updateTransactionDto,
    );

    return transaction;
  }

  async remove(userId: string, id: string) {
    await this.checkTransactionExistsService.check(userId, id);

    await this.transactionsRepository.remove(userId, id);

    return null;
  }

  private async checkEntitiesExists({
    userId,
    categoryId,
    bankAccountId,
  }: {
    userId: string;
    categoryId: string;
    bankAccountId: string;
  }) {
    await Promise.all([
      this.checkCategoryExistsService.check(userId, categoryId),
      this.checkBankAccountExistsService.check(userId, bankAccountId),
    ]);
  }
}
