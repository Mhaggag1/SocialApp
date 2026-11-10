import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProfileService } from '../profile.service';
import { PostService } from '../../../core/services/posts/post.service';
import { Iposts } from '../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  imports: [RouterLink, DatePipe],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly postService = inject(PostService);

  myPosts: WritableSignal<Iposts[]> = signal([]);

  ngOnInit(): void {
    this.loadMyPosts();
  }

  loadMyPosts(): void {
    const savedUser = localStorage.getItem('socialUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user?._id) {
        this.fetchPosts(user._id);
        return;
      }
    }
    this.profileService.getProfileData().subscribe({
      next: (res: any) => {
        const userId = res?.data?.user?._id;
        if (userId) {
          this.fetchPosts(userId);
        }
      },
      error: (err) => console.log(err),
    });
  }

  fetchPosts(userId: string): void {
    this.profileService.getUserPosts(userId).subscribe({
      next: (res: any) => {
        this.myPosts.set(res?.data?.posts || []);
      },
      error: (err) => console.log(err),
    });
  }

  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe({
      next: () => this.loadMyPosts(),
      error: (err) => console.log(err),
    });
  }

  sharePost(postId: string): void {
    this.postService.sharePost(postId).subscribe({
      next: () => this.loadMyPosts(),
      error: (err) => console.log(err),
    });
  }
}
