import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommentsService } from '../../../../core/services/comments/comments.service';
import { Icomments } from '../../../../core/models/icomments.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../../../../user.interface';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  postId: InputSignal<string> = input.required();
  postComments: WritableSignal<Icomments[]> = signal([]);
  loggedInUser: WritableSignal<User | null> = signal(null);

  commentInput = new FormControl('');
  editingCommentId: WritableSignal<string | null> = signal(null);
  replyingToCommentId: WritableSignal<string | null> = signal(null);
  repliesMap: WritableSignal<Record<string, Icomments[]>> = signal({});

  ngOnInit(): void {
    const savedUser = localStorage.getItem('socialUser');
    if (savedUser) {
      this.loggedInUser.set(JSON.parse(savedUser));
    }
    this.getPostComments();
  }

  getPostComments() {
    this.commentsService.getPostComments(this.postId()).subscribe({
      next: (res) => {
        this.postComments.set(res.data.comments);
        console.log(this.postComments());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitComment() {
    const content = this.commentInput.value?.trim();
    if (!content) return;

    const formData = new FormData();
    formData.append('content', content);

    const editId = this.editingCommentId();
    const replyId = this.replyingToCommentId();

    if (editId) {
      this.commentsService.updateComment(this.postId(), editId, formData).subscribe({
        next: () => {
          this.commentInput.reset();
          this.editingCommentId.set(null);
          this.getPostComments();
        },
        error: (err) => console.log(err),
      });
    } else if (replyId) {
      this.commentsService.createReply(this.postId(), replyId, formData).subscribe({
        next: () => {
          this.commentInput.reset();
          this.loadReplies(replyId);
          this.replyingToCommentId.set(null);
          this.getPostComments();
        },
        error: (err) => console.log(err),
      });
    } else {
      this.commentsService.createComment(this.postId(), formData).subscribe({
        next: () => {
          this.commentInput.reset();
          this.getPostComments();
        },
        error: (err) => console.log(err),
      });
    }
  }

  likeComment(commentId: string) {
    this.commentsService.likeComment(this.postId(), commentId).subscribe({
      next: () => {
        this.getPostComments();
      },
      error: (err) => console.log(err),
    });
  }

  startEditComment(comment: Icomments) {
    this.replyingToCommentId.set(null);
    this.editingCommentId.set(comment._id);
    this.commentInput.setValue(comment.content || '');
  }

  deleteComment(commentId: string) {
    this.commentsService.deleteComment(this.postId(), commentId).subscribe({
      next: () => {
        this.getPostComments();
      },
      error: (err) => console.log(err),
    });
  }

  toggleReply(commentId: string) {
    this.editingCommentId.set(null);
    if (this.replyingToCommentId() === commentId) {
      this.replyingToCommentId.set(null);
    } else {
      this.replyingToCommentId.set(commentId);
      this.loadReplies(commentId);
    }
  }

  loadReplies(commentId: string) {
    this.commentsService.getCommentReplies(this.postId(), commentId).subscribe({
      next: (res) => {
        const replies = res?.data?.replies || res?.data?.comments || [];
        this.repliesMap.update((prev) => ({ ...prev, [commentId]: replies }));
      },
      error: (err) => console.log(err),
    });
  }
}
