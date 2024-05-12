import { Injectable } from '@nestjs/common';
// Services
import { PrismaService } from '../prisma.service';
// DTOs
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
