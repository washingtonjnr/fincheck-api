import { Injectable } from '@nestjs/common';
// Packages
import { hash } from 'bcryptjs';
// Services
import { PrismaService } from '../prisma.service';
// DTOs
import { SignUpTdo } from 'src/modules/auth/dto/signup.dto';
// Mocks
import { defaultCategories } from 'src/shared/mocks/defaultCategories';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<SignUpTdo> {
    const emailTaken = this.prismaService.user.findUnique({
      where: { email },
    });

    return emailTaken;
  }

  async create(createDto: SignUpTdo): Promise<SignUpTdo> {
    const { name, email, password } = createDto;

    const hashedPassword = await hash(password, 12);

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: defaultCategories,
          },
        },
      },
    });

    return newUser;
  }
}
