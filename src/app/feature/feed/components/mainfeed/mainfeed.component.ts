import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../../../core/services/posts/post.service';
import { Iposts } from '../../../../core/models/iposts.interface';
import { CommentsComponent } from '../comments/comments.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mainfeed',
  imports: [CommentsComponent, ReactiveFormsModule],
  templateUrl: './mainfeed.component.html',
  styleUrl: './mainfeed.component.css',
})
export class MainfeedComponent implements OnInit {
  private readonly postService = inject(PostService);
  allPosts: WritableSignal<Iposts[]> = signal([]);
  imageToDisplay: WritableSignal<string | ArrayBuffer | null | undefined> = signal(null);

  // *file
  selectedImg!: File;
  // *body
  bodyInput = new FormControl('');
  // *privacy
  privacyInput = new FormControl('public');

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

  selectImage(e: Event): void {
    if (e.target) {
      let target = e.target as HTMLInputElement;
      if (target.files) {
        this.selectedImg = target.files[0];
        console.log(this.selectedImg);
        // Display Img In HTML
        // Take instance from file reader
        let fileReader = new FileReader();

        // 2. user readAsDataURL()
        fileReader.readAsDataURL(this.selectedImg);

        // Onload
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          this.imageToDisplay.set(e.target?.result);
        };
      }
    }
  }
  // خدها حطها على حاجة هناك
  resetChosenImg() {
    this.imageToDisplay.set(null);
  }

  resetPostCreation(): void {
    this.bodyInput.reset();
    this.privacyInput.reset('public');
    this.imageToDisplay.set(null);
  }

  submitCreate(e: SubmitEvent) {
    e.preventDefault();

    let myForm = new FormData();
    if (this.selectedImg) {
      myForm.append('image', this.selectedImg);
    }
    if (this.bodyInput.value) {
      myForm.append('body', this.bodyInput.value);
    }
    if (this.privacyInput.value) {
      myForm.append('privacy', this.privacyInput.value);
    }

    // SUbscribe and send form data
    this.postService.createPost(myForm).subscribe({
      next: (res) => {
        console.log(res);
        this.resetPostCreation();
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
