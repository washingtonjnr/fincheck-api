import { Injectable, NotFoundException } from '@nestjs/common';
// Repositories
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CheckCategoryExistsService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async check(userId: string, id: string): Promise<void> {
    const CategorieExists = await this.categoriesRepository.findFirst(
      userId,
      id,
    );

    if (!CategorieExists) {
      throw new NotFoundException('Category not found');
    }
  }
}
