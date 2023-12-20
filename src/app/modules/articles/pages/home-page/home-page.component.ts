import { HttpErrorResponse } from '@angular/common/http';
import { ArticlesResponse } from '../../interfaces/articles-response.interface';
import { ArticlesService } from '../../services/articles.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FeedName } from '../../enums/feed-name.enum';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  activeFeed!: FeedName;
  activeTag = '';

  constructor(
    public authServ: AuthService,
    private articlesServ: ArticlesService
  ) {}

  ngOnInit(): void {
    if (this.authServ.isAuthenticated()) {
      this.fetchYourFeed();
    } else {
      this.fetchGlobalFeed();
    }
  }

  private prepareForFetching(feed: FeedName): void {
    this.loading = true;
    this.articles = [];
    this.activeFeed = feed;
  }

  fetchYourFeed(): void {
    this.prepareForFetching(FeedName.YourFeed);

    this.articlesServ.getYourFeed().subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        if (err.status === 401) {
          this.fetchGlobalFeed();
        }
      },
    });
  }

  fetchGlobalFeed(): void {
    this.prepareForFetching(FeedName.GlobalFeed);

    this.articlesServ.getFeed().subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        if (err.status === 401) {
          this.fetchGlobalFeed();
        }
      },
    });
  }

  fetchTagFeed(tag: string): void {
    this.prepareForFetching(FeedName.TagFeed);
    this.activeTag = tag;

    this.articlesServ.getFeed({ tag }).subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        if (err.status === 401) {
          this.fetchGlobalFeed();
        }
      },
    });
  }

  yourFeedClickHandler(): void {
    this.fetchYourFeed();
  }

  globalFeedClickHandler(): void {
    this.fetchGlobalFeed();
  }

  tagFeedClickHandler(tag: string): void {
    this.fetchTagFeed(tag);
  }
}
