import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProfileService } from '../profile.service';
import { PostService } from '../../../core/services/posts/post.service';
import { Iposts } from '../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-saved-posts',
  imports: [RouterLink, DatePipe],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly postService = inject(PostService);

  savedPosts: WritableSignal<Iposts[]> = signal([]);

  ngOnInit(): void {
    this.loadSavedPosts();
  }

  loadSavedPosts(): void {
    this.profileService.getBookmarks().subscribe({
      next: (res: any) => {
        const bookmarks = res?.data?.bookmarks || res?.data?.posts || [];
        this.savedPosts.set(bookmarks);
      },
      error: (err) => console.log(err),
    });
  }

  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe({
      next: () => this.loadSavedPosts(),
      error: (err) => console.log(err),
    });
  }

  sharePost(postId: string): void {
    this.postService.sharePost(postId).subscribe({
      next: () => this.loadSavedPosts(),
      error: (err) => console.log(err),
    });
  }
}
