import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async findAll() {
    return this.articlesRepository.find({});
  }

  async create(createArticleDto: CreateArticleDto) {
    return this.articlesRepository.create(createArticleDto);
  }

  async findBy(id: number) {
    return this.articlesRepository.findOne({ _id: id });
  }
}
