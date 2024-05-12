import { Injectable, NotFoundException } from '@nestjs/common';
// Repositories
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class CheckTransactionExistsService {
  constructor(private readonly TransactionRepository: TransactionsRepository) {}

  public async check(userId: string, id: string): Promise<void> {
    const TransactionExists = await this.TransactionRepository.findFirst(
      userId,
      id,
    );

    if (!TransactionExists) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
