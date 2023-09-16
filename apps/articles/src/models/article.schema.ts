import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Article extends AbstractDocument {
  @Prop()
  title: string;

  @Prop({ required: false })
  slug: string;

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
