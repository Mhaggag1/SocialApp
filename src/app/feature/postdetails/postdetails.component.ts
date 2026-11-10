import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/services/posts/post.service';
import { CommentsComponent } from '../feed/components/comments/comments.component';
import { Iposts } from '../../core/models/iposts.interface';
import { DatePipe } from '@angular/common';
import { User } from '../../user.interface';

@Component({
  selector: 'app-postdetails',
  imports: [CommentsComponent, DatePipe],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css',
})
export class PostdetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);

  postId = signal('');
  post = signal<Iposts | null>(null);
  loggedInUserData: WritableSignal<User> = signal({} as User);

  ngOnInit(): void {
    const storedUser = localStorage.getItem('socialUser');
    if (storedUser) {
      this.loggedInUserData.set(JSON.parse(storedUser));
    }
    this.readDataFromUrl();
  }

  readDataFromUrl() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.postId.set(id);
        this.getPostDetails(id);
      }
    });
  }

  getPostDetails(id: string) {
    this.postService.getSinglePost(id).subscribe({
      next: (res) => {
        console.log(res.data.post);
        this.post.set(res.data.post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  SavePost(postId: string) {
    this.postService.bookmarkPost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostDetails(postId);
      },
      error: (err) => console.log(err),
    });
  }

  deletPost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/feed']);
      },
      error: (err) => console.log(err),
    });
  }

  likePost(postId: string) {
    this.postService.likePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostDetails(postId);
      },
      error: (err) => console.log(err),
    });
  }

  sharePost(postId: string) {
    this.postService.sharePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostDetails(postId);
      },
      error: (err) => console.log(err),
    });
  }
}
