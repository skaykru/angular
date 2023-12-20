import { CommentEvent } from '../interfaces/comment-event.interface';
import { CommentEventName } from '../enums/comment-event-name.enum';
import { Comment } from '../interfaces/comment.interface';
import { CommentsResponse } from '../interfaces/comments-response.interface';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentResponse } from '../interfaces/comment-response.interface';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  comments$ = new Subject<CommentEvent>();

  constructor(private http: HttpClient) {}

  dispatchCommentAdded(comment: Comment): void {
    this.comments$.next({
      eventName: CommentEventName.CommentAdded,
      comment,
    });
  }

  addComment(slug: string, body: string): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${environment.apiBaseUrl}/articles/${slug}/comments`,
      { comment: { body } }
    );
  }

  deleteComment(slug: string, commentId: number): Observable<never> {
    return this.http.delete<never>(
      `${environment.apiBaseUrl}/articles/${slug}/comments/${commentId}`
    );
  }

  getComments(slug: string): Observable<CommentsResponse> {
    return this.http.get<CommentsResponse>(
      `${environment.apiBaseUrl}/articles/${slug}/comments`
    );
  }
}
