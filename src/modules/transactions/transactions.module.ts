import { Module } from '@nestjs/common';
// Services
import { TransactionsService } from './services/transactions.service';
import { CheckTransactionExistsService } from './services/check-transaction-exists.service';
import { CheckBankAccountExistsService } from '../bank-accounts/services/check-bank-account-exists.service';
// Controllers
import { TransactionsController } from './transactions.controller';
import { CheckCategoryExistsService } from '../categories/services/check-category-exists.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    CheckTransactionExistsService,
    CheckCategoryExistsService,
    CheckBankAccountExistsService,
  ],
})
export class TransactionsModule {}
