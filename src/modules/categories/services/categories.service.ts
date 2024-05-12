import { Injectable } from '@nestjs/common';
// Repositories
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRespositories: CategoriesRepository) {}
  findAll(userId: string) {
    return this.categoriesRespositories.findAll(userId);
  }

  findFirst(userId: string, id: string) {
    return this.categoriesRespositories.findFirst(userId, id);
  }
}
