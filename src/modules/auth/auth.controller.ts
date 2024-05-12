import { Body, Controller, Post } from '@nestjs/common';
// Service
import { AuthService } from './auth.service';
// DTOs
import { SignUpTdo } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
// Decorators
import { IsPublic } from 'src/shared/decorators/IsPublic';

@IsPublic() // Used to disable JWT checking
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpTdo: SignUpTdo) {
    return this.authService.signup(signUpTdo);
  }
}
