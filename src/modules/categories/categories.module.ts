import { Module } from '@nestjs/common';
// Services
import { CategoriesService } from './services/categories.service';
import { CheckCategoryExistsService } from './services/check-category-exists.service';
// Controller
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CheckCategoryExistsService],
})
export class CategoriesModule {}
