import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

// Checks if all variables exist and have a valid value
class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  databaseUrl: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_KEY,
  databaseUrl: process.env.DATABASE_URL,
});

const errors = validateSync(env);

// If there is an error, it stop the process
if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
