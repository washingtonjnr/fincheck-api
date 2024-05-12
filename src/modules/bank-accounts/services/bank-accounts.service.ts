import { ConflictException, Injectable } from '@nestjs/common';
// DTOs
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
// Repositories
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
// Services
import { CheckBankAccountExistsService } from './check-bank-account-exists.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepository: BankAccountsRepository,
    private readonly checkBankAccountExistsService: CheckBankAccountExistsService,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, type } = createBankAccountDto;

    const bankAccountExists =
      await this.bankAccountRepository.findOneByNameAndType(userId, name, type);

    if (bankAccountExists) {
      throw new ConflictException(
        'A bank account with this name and type already exists',
      );
    }

    const bankAccount = await this.bankAccountRepository.create(
      userId,
      createBankAccountDto,
    );

    return bankAccount;
  }

  async findAll(userId: string) {
    const bankAccounts = await this.bankAccountRepository.findAll(userId);

    return bankAccounts;
  }

  async findOne(id: string) {
    const bankAccount = await this.bankAccountRepository.findOne(id);

    return bankAccount;
  }

  async update(
    userId: string,
    id: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.checkBankAccountExistsService.check(userId, id);

    const bankAccount = await this.bankAccountRepository.update(
      userId,
      id,
      updateBankAccountDto,
    );

    return bankAccount;
  }

  async remove(userId: string, id: string) {
    await this.checkBankAccountExistsService.check(userId, id);

    await this.bankAccountRepository.remove(userId, id);

    return null;
  }
}
