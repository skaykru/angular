import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleResponse } from '../../interfaces/article-response.interface';
import { ArticlesService } from '../../services/articles.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit {
  articleForm!: FormGroup;
  error!: HttpErrorResponse;
  slug!: string;
  loading = false;

  constructor(
    private articleServ: ArticlesService,
    private router: Router,
    private route: ActivatedRoute,
    private authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      body: new FormControl(null),
      tagList: new FormControl(null),
    });

    this.route.params.subscribe((params: Params) => {
      if (!params['slug']) {
        return;
      }

      this.slug = params['slug'];
      this.loading = true;

      this.articleServ.getArticleBySlug(params['slug']).subscribe({
        next: (res: ArticleResponse) => {
          if (
            res.article.author.username !== this.authServ.currentUser?.username
          ) {
            this.router.navigate(['/']);
          }

          this.articleForm.get('title')?.setValue(res.article.title);
          this.articleForm
            .get('description')
            ?.setValue(res.article.description);
          this.articleForm.get('body')?.setValue(res.article.body);
          this.articleForm
            .get('tagList')
            ?.setValue(res.article.tagList.join(' '));

          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.router.navigate(['/']);
          }
        },
      });
    });
  }

  articleFormSubmit(): void {
    this.loading = true;

    const title = this.articleForm.get('title')?.value;
    const description = this.articleForm.get('description')?.value;
    const body = this.articleForm.get('body')?.value;
    let tagList = this.articleForm.get('tagList')?.value;

    if (tagList) {
      tagList = tagList.split(' ').filter((tag: string) => !!tag);
    }

    if (!this.slug) {
      this.articleServ
        .createArticle(title, description, body, tagList)
        .subscribe({
          next: (res: ArticleResponse) =>
            this.router.navigate([`/article/${res.article.slug}`]),
          error: (httpErr: HttpErrorResponse) => {
            this.error = httpErr;
            this.loading = false;
          },
        });
    } else {
      this.articleServ
        .updateArticle(this.slug, title, description, body)
        .subscribe({
          next: (res: ArticleResponse) =>
            this.router.navigate([`/article/${res.article.slug}`]),
          error: (httpErr: HttpErrorResponse) => {
            this.error = httpErr;
            this.loading = false;
          },
        });
    }
  }
}
