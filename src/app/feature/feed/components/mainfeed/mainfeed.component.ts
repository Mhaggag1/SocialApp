import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../../../core/services/posts/post.service';
import { Iposts } from '../../../../core/models/iposts.interface';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-mainfeed',
  imports: [CommentsComponent],
  templateUrl: './mainfeed.component.html',
  styleUrl: './mainfeed.component.css',
})
export class MainfeedComponent implements OnInit {
  private readonly postService = inject(PostService);
  allPosts: WritableSignal<Iposts[]> = signal([]);

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.allPosts.set(res.data.posts);
        console.log(this.allPosts());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
