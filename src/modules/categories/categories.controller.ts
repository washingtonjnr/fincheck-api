import { Controller, Get, Param } from '@nestjs/common';
// Services
import { CategoriesService } from './services/categories.service';
// Decoratos
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAll(userId);
  }

  @Get(':id')
  findFirst(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.categoriesService.findFirst(userId, id);
  }
}
