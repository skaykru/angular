import { Article } from './article.interface';

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
