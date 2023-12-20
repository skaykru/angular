import { CommentsComponent } from './components/comments/comments.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

@NgModule({
  declarations: [CommentFormComponent, CommentsComponent],
  imports: [CommonModule, SharedModule],
  exports: [CommentFormComponent, CommentsComponent],
})
export class CommentsModule {}
