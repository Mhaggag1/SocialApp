import { AfterViewInit, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../../../core/services/posts/post.service';
import { Iposts } from '../../../../core/models/iposts.interface';
import { CommentsComponent } from '../comments/comments.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { User } from '../../../../user.interface';
import { RouterLink } from '@angular/router';
import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FiltrationPipe } from '../../../../shared/pipes/filtration-pipe';

@Component({
  selector: 'app-mainfeed',
  imports: [
    CommentsComponent,
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    UpperCasePipe,

    FiltrationPipe,
    FormsModule,
  ],
  templateUrl: './mainfeed.component.html',
  styleUrl: './mainfeed.component.css',
})
export class MainfeedComponent implements OnInit {
  private readonly postService = inject(PostService);
  allPosts: WritableSignal<Iposts[]> = signal([]);
  loggedInUserData: WritableSignal<User> = signal({} as User);
  imageToDisplay: WritableSignal<string | ArrayBuffer | null | undefined> = signal(null);

  // *file
  selectedImg: File | null = null;
  // *body
  bodyInput = new FormControl('');
  // *privacy
  privacyInput = new FormControl('public');

  editingPostId: WritableSignal<string | null> = signal(null);
  searchText = signal('');

  ngOnInit(): void {
    this.getAllPosts();
    this.saveUserData();
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

  saveUserData(): void {
    const storedUser = localStorage.getItem('socialUser');
    if (storedUser) {
      this.loggedInUserData.set(JSON.parse(storedUser));
    }
    console.log(this.loggedInUserData);
  }

  selectImage(e: Event): void {
    if (e.target) {
      let target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
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
    this.selectedImg = null;
    this.imageToDisplay.set(null);
  }

  resetPostCreation(): void {
    this.bodyInput.reset();
    this.privacyInput.reset('public');
    this.selectedImg = null;
    this.imageToDisplay.set(null);
    this.editingPostId.set(null);
  }

  startEditPost(post: Iposts): void {
    this.editingPostId.set(post._id);
    this.bodyInput.setValue(post.body || '');
    this.privacyInput.setValue(post.privacy || 'public');
    this.imageToDisplay.set(post.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const editId = this.editingPostId();
    const request$ = editId
      ? this.postService.updatePost(editId, myForm)
      : this.postService.createPost(myForm);

    // SUbscribe and send form data
    request$.subscribe({
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

  deletPost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  SavePost(postId: string): void {
    this.postService.bookmarkPost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sharePost(postId: string): void {
    this.postService.sharePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
