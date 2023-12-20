import { AuthService } from '../../../auth/services/auth.service';
import { CommentResponse } from '../../interfaces/comment-response.interface';
import { CommentsService } from '../../services/comments.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../articles/interfaces/article.interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input('article') article!: Article;
  commentForm!: FormGroup;
  loading = false;

  constructor(
    private commentsServ: CommentsService,
    public authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({ comment: new FormControl(null) });
  }

  commentFormSubmit(): void {
    if (!this.commentForm.get('comment')?.value) {
      return;
    }

    this.loading = true;

    this.commentsServ
      .addComment(this.article.slug, this.commentForm.get('comment')?.value)
      .subscribe({
        next: (res: CommentResponse) => {
          this.commentsServ.dispatchCommentAdded(res.comment);
          this.commentForm.reset();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
