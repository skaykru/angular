import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/modules/articles/interfaces/article.interface';
import { ArticlesResponse } from 'src/app/modules/articles/interfaces/articles-response.interface';
import { ArticlesService } from 'src/app/modules/articles/services/articles.service';

@Component({
  selector: 'app-favorited-articles',
  templateUrl: './favorited-articles.component.html',
  styleUrls: ['./favorited-articles.component.scss'],
})
export class FavoritedArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading = false;

  constructor(
    private articlesServ: ArticlesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.articlesServ
      .getFeed({ favorited: this.route.snapshot.parent?.params['username'] })
      .subscribe({
        next: (res: ArticlesResponse) => {
          this.articles = res.articles;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
