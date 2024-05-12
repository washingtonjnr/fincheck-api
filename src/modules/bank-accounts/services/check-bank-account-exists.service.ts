import { Injectable, NotFoundException } from '@nestjs/common';
// Repositories
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class CheckBankAccountExistsService {
  constructor(private readonly bankAccountRepository: BankAccountsRepository) {}

  public async check(userId: string, id: string): Promise<void> {
    const bankAccountExists = await this.bankAccountRepository.findFirst(
      userId,
      id,
    );

    if (!bankAccountExists) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
