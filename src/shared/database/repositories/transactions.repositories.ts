import { Injectable } from '@nestjs/common';
// Services
import { PrismaService } from '../prisma.service';
// DTOs and Entities
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { TransactionType } from 'src/modules/transactions/entities/transaction-type.entity';
import { CreateTransactionDto } from 'src/modules/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/modules/transactions/dto/update-transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.create({
      data: {
        ...transactionDto,
        userId,
      },
      select: this.trasactionSelectionObject,
    });

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
      bankAccountId: string;
      type?: TransactionType;
    },
  ): Promise<any[]> {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
        bankAccountId,
        type,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1)),
        },
      },
      select: this.trasactionSelectionObject,
    });

    return transactions;
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      select: this.trasactionSelectionObject,
    });

    return transaction;
  }

  async findFirst(userId: string, id: string): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.findFirstOrThrow({
      where: { userId, id },
    });

    return transaction;
  }

  async update(
    userId: string,
    id: string,
    transactionDto: UpdateTransactionDto,
  ): Promise<any> {
    const transaction = await this.prismaService.transaction.update({
      where: { id, userId },
      data: transactionDto,
    });

    return transaction;
  }

  async remove(userId: string, id: string): Promise<null> {
    await this.prismaService.transaction.delete({
      where: { userId, id },
    });

    return null;
  }

  private trasactionSelectionObject: object = {
    id: true,
    date: true,
    type: true,
    name: true,
    value: true,
    category: true,
    bankAccount: true,
  };
}
