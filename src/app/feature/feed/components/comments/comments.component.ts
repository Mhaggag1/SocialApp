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

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  postId: InputSignal<string> = input.required();
  postComments: WritableSignal<Icomments[]> = signal([]);

  ngOnInit(): void {
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
}
