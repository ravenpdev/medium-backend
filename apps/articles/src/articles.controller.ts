import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  allArticles() {
    return this.articlesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  articleById(@Param('id') id: string) {
    return this.articlesService.findBy(parseInt(id));
  }
}
