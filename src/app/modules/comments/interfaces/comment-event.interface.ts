import { CommentEventName } from '../enums/comment-event-name.enum';
import { Comment } from './comment.interface';

export interface CommentEvent {
  eventName: CommentEventName;
  comment: Comment;
}
