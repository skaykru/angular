import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/modules/articles/services/articles.service';
import { ArticleResponse } from 'src/app/modules/articles/interfaces/article-response.interface';
import { Article } from 'src/app/modules/articles/interfaces/article.interface';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input('article') article!: Article;
  @Input('is-in-feed') isInFeed = true;
  loading = false;

  constructor(
    private articlesServ: ArticlesService,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleFavorited(): void {
    if (!this.authServ.isAuthenticated()) {
      this.router.navigate(['/register']);
      return;
    }

    this.loading = true;

    if (this.article.favorited) {
      this.articlesServ.unfavoriteArticle(this.article.slug).subscribe({
        next: (res: ArticleResponse) => {
          Object.assign(this.article, res.article);
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    } else {
      this.articlesServ.favoriteArticle(this.article.slug).subscribe({
        next: (res: ArticleResponse) => {
          Object.assign(this.article, res.article);
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }
}
