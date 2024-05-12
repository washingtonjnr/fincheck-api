import { Module } from '@nestjs/common';
// Services
import { BankAccountsService } from './services/bank-accounts.service';
import { CheckBankAccountExistsService } from './services/check-bank-account-exists.service';
// Controllers
import { BankAccountsController } from './bank-accounts.controller';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, CheckBankAccountExistsService],
})
export class BankAccountsModule {}
