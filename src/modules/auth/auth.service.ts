import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Packages
import { compare } from 'bcryptjs';
// DTo
import { SignUpTdo } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
// Repository
import { AuthRepository } from 'src/shared/database/repositories/auth.repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpTdo: SignUpTdo): Promise<{ accessToken: string }> {
    const { name, email, password } = signUpTdo;

    const emailTaken = await this.authRepository.findOne(email);

    if (emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const user = await this.authRepository.create({
      name,
      email,
      password,
    });

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  async signin(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    // Check account
    const user = await this.authRepository.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credencials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credencials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken,
    };
  }

  private async generateAccessToken(userId: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      sub: userId,
    });

    return accessToken;
  }
}
