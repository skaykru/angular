import { ArticleResponse } from '../interfaces/article-response.interface';
import { ArticlesResponse } from '../interfaces/articles-response.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticleBySlug(slug: string): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(
      `${environment.apiBaseUrl}/articles/${slug}`
    );
  }

  createArticle(
    title: string,
    description: string,
    body: string,
    tagList: string[]
  ): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(
      `${environment.apiBaseUrl}/articles`,
      {
        article: {
          title,
          description,
          body,
          tagList,
        },
      }
    );
  }

  updateArticle(
    slug: string,
    title: string,
    description: string,
    body: string
  ): Observable<ArticleResponse> {
    return this.http.put<ArticleResponse>(
      `${environment.apiBaseUrl}/articles/${slug}`,
      { article: { title, description, body } }
    );
  }

  deleteArticle(slug: string): Observable<never> {
    return this.http.delete<never>(
      `${environment.apiBaseUrl}/articles/${slug}`
    );
  }

  favoriteArticle(slug: string): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(
      `${environment.apiBaseUrl}/articles/${slug}/favorite`,
      {}
    );
  }

  unfavoriteArticle(slug: string): Observable<ArticleResponse> {
    return this.http.delete<ArticleResponse>(
      `${environment.apiBaseUrl}/articles/${slug}/favorite`
    );
  }

  getFeed(queryParams?: {
    tag?: string;
    author?: string;
    favorited?: string;
  }): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(
      this.addQueryParams(`${environment.apiBaseUrl}/articles`, queryParams)
    );
  }

  getYourFeed(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(
      `${environment.apiBaseUrl}/articles/feed`
    );
  }

  private addQueryParams(url: string, queryParams?: { [key: string]: string }) {
    if (!queryParams) return url;

    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${url}?${queryString}`;
  }
}
