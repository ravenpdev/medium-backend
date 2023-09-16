import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '@app/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  allArticles() {
    return this.articlesService.findAll();
  }

  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  articleById(@Param('id') id: string) {
    return this.articlesService.findBy(parseInt(id));
  }
}
