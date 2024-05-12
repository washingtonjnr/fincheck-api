import { Injectable } from '@nestjs/common';
// Services
import { PrismaService } from '../prisma.service';
// DTOs | Entities
import { BankAccount } from 'src/modules/bank-accounts/entities/bank-account.entity';
import { CreateBankAccountDto } from 'src/modules/bank-accounts/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from 'src/modules/bank-accounts/dto/update-bank-account.dto';
import { BankAccountType } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    bankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount> {
    const bankAccount = this.prismaService.bankAccount.create({
      data: {
        ...bankAccountDto,
        userId,
      },
      select: this.bankAccountSelectionObject,
    });

    return bankAccount;
  }

  async findAll(userId: string): Promise<BankAccount[]> {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    // To adding "Current Balande" on Bank
    const allBanks = bankAccounts.map(({ transactions, ...bank }) => {
      const { initialBalance } = bank;

      const currentBalance = transactions.reduce((tAcc, tCurrent) => {
        if (tCurrent.type === 'EXPENSE') {
          return tAcc - tCurrent.value;
        }

        return tAcc + tCurrent.value;
      }, initialBalance);

      return {
        ...bank,
        currentBalance,
      };
    });

    return allBanks;
  }

  // Find per (bank account id)
  async findOne(id: string): Promise<BankAccount | null> {
    const bankAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      select: this.bankAccountSelectionObject,
    });

    return bankAccount;
  }

  // Find per (bank account id and user id)
  async findFirst(
    userId: string,
    id: string,
  ): Promise<BankAccount | undefined> {
    const bankAccount = await this.prismaService.bankAccount.findFirst({
      where: { userId, id },
      select: this.bankAccountSelectionObject,
    });

    return bankAccount;
  }

  // Find per (name, type and user id)
  async findOneByNameAndType(
    userId: string,
    name: string,
    type: BankAccountType,
  ): Promise<BankAccount | null> {
    const bankAccount = await this.prismaService.bankAccount.findFirst({
      where: {
        userId,
        name,
        type,
      },
      select: this.bankAccountSelectionObject,
    });

    return bankAccount;
  }

  async update(
    userId: string,
    id: string,
    bankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccount> {
    const bankAccount = await this.prismaService.bankAccount.update({
      where: { id, userId },
      data: bankAccountDto,
      select: this.bankAccountSelectionObject,
    });

    return bankAccount;
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.prismaService.bankAccount.delete({
      where: { userId, id },
    });

    return null;
  }

  private bankAccountSelectionObject: object = {
    id: true,
    name: true,
    type: true,
    color: true,
    category: false,
    transactions: false,
    initialBalance: true,
  };
}
