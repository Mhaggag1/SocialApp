import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/posts/post.service';
import { CommentsComponent } from '../feed/components/comments/comments.component';
import { Iposts } from '../../core/models/iposts.interface';

@Component({
  selector: 'app-postdetails',
  imports: [CommentsComponent],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css',
})
export class PostdetailsComponent implements OnInit {
  SavePost(arg0: string) {
    throw new Error('Method not implemented.');
  }
  deletPost(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(PostService);

  postId = signal('');
  post = signal<Iposts | null>(null);

  ngOnInit(): void {
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
}
