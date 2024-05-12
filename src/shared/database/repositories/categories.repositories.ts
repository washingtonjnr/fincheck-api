import { Injectable } from '@nestjs/common';
// Entities
// import { Category } from '../../../modules/categories/entities/category.entity';
// Services
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFirst(userId: string, id: string): Promise<any> {
    const category = await this.prismaService.category.findFirst({
      where: {
        userId,
        id,
      },
      select: this.categorySelectionObject,
    });

    return category;
  }

  async findAll(userId: string): Promise<any[]> {
    const categories = await this.prismaService.category.findMany({
      where: { userId },
      select: this.categorySelectionObject,
    });

    return categories;
  }

  async remove(userId: string, id: string): Promise<null> {
    await this.prismaService.category.delete({
      where: {
        userId,
        id,
      },
    });

    return null;
  }

  private categorySelectionObject: object = {
    id: true,
    type: true,
    icon: true,
    name: true,
    transactions: true,
  };
}
