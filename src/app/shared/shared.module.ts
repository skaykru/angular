import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { ErrorsListComponent } from './components/errors-list/errors-list.component';
import { DeleteArticleButtonComponent } from './components/delete-article-button/delete-article-button.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ArticlesComponent,
    DeleteArticleButtonComponent,
    ErrorsListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    LogoutButtonComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ArticlesComponent,
    DeleteArticleButtonComponent,
    ErrorsListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    LogoutButtonComponent,
  ],
})
export class SharedModule {}
