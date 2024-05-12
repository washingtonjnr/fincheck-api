import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';
// Entities
import { BankAccountType } from '../entities/bank-account-type.entity';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;
}
