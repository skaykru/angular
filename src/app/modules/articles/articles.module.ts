import { CommentsModule } from './../comments/comments.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { FeedToggleComponent } from './components/feed-toggle/feed-toggle.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    FeedToggleComponent,
    SidebarComponent,
    ArticlePageComponent,
    EditorPageComponent,
    HomePageComponent,
  ],
  imports: [SharedModule, CommentsModule],
})
export class ArticlesModule {}
