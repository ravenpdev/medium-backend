import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Article } from './models/article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesRepository extends AbstractRepository<Article> {
  protected readonly logger = new Logger(ArticlesRepository.name);

  constructor(@InjectModel(Article.name) model: Model<Article>) {
    super(model);
  }
}
