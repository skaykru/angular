import { ActivatedRoute, Params } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/modules/articles/interfaces/article.interface';
import { ArticlesService } from 'src/app/modules/articles/services/articles.service';
import { ArticlesResponse } from 'src/app/modules/articles/interfaces/articles-response.interface';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss'],
})
export class MyArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading = false;

  constructor(
    private articlesServ: ArticlesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.loading = true;

      this.articlesServ.getFeed({ author: params['username'] }).subscribe({
        next: (res: ArticlesResponse) => {
          this.articles = res.articles;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    });
  }
}
