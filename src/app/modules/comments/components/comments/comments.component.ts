import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CommentEventName } from '../../enums/comment-event-name.enum';
import { CommentEvent } from '../../interfaces/comment-event.interface';
import { CommentsResponse } from '../../interfaces/comments-response.interface';
import { Comment } from '../../interfaces/comment.interface';
import { CommentsService } from '../../services/comments.service';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../articles/interfaces/article.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input('article') article!: Article;
  comments: Comment[] = [];

  constructor(
    private commentsServ: CommentsService,
    public authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.commentsServ
      .getComments(this.article.slug)
      .subscribe((res: CommentsResponse) => {
        this.comments = res.comments;
      });

    this.commentsServ.comments$.subscribe((event: CommentEvent) => {
      if (event.eventName === CommentEventName.CommentAdded) {
        this.comments.push(event.comment);
      }
    });
  }

  deleteCommentHandler(comment: Comment): void {
    this.commentsServ.deleteComment(this.article.slug, comment.id).subscribe({
      next: () => {
        const commentIdx = this.comments.findIndex(
          (com: Comment) => com.id === comment.id
        );

        this.comments.splice(commentIdx, 1);
      },
    });
  }
}
