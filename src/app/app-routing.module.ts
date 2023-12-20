import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from './modules/profile/profile.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { FavoritedArticlesComponent } from './modules/profile/components/favorited-articles/favorited-articles.component';
import { MyArticlesComponent } from './modules/profile/components/my-articles/my-articles.component';
import { ProfilePageComponent } from './modules/profile/pages/profile-page/profile-page.component';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { ArticlePageComponent } from './modules/articles/pages/article-page/article-page.component';
import { HomePageComponent } from './modules/articles/pages/home-page/home-page.component';
import { EditorPageComponent } from './modules/articles/pages/editor-page/editor-page.component';
import { SettingsPageComponent } from './modules/profile/pages/settings-page/settings-page.component';
import { AlreadyAuthenticatedGuard } from './modules/auth/guards/already-authenticated.guard';
import { NotAuthenticatedGuard } from './modules/auth/guards/not-authenticated.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'article/:slug',
    component: ArticlePageComponent,
  },
  {
    path: 'editor',
    component: EditorPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: 'editor/:slug',
    component: EditorPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent,
    children: [
      { path: '', component: MyArticlesComponent },
      { path: 'favorites', component: FavoritedArticlesComponent },
    ],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
