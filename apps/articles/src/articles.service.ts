import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  articles = [
    {
      id: 1,
      title: 'title',
      body: 'body',
    },
  ];

  async findAll() {
    return this.articles;
  }

  async findBy(id: number) {
    const result = this.articles.find((article) => article.id === id);

    if (!result) {
      throw new NotFoundException('Article not Found');
    }

    return result;
  }
}
