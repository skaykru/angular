import { SharedModule } from './../../shared/shared.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritedArticlesComponent } from './components/favorited-articles/favorited-articles.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';

@NgModule({
  declarations: [
    FavoritedArticlesComponent,
    MyArticlesComponent,
    ProfilePageComponent,
    SettingsPageComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ProfileModule {}
