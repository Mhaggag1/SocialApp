import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ProfileService } from './profile.service';
import { UploadProfilePicService } from './upload-profile-pic.service';
import { UserData } from './user-data.interface';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly uploadProfilePicService = inject(UploadProfilePicService);

  // 1. غيرناها من UserData[] إلى UserData | null لأنها Object واحد
  userProfileData: WritableSignal<UserData | null> = signal(null);
  myPostsCount: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.profileService.getProfileData().subscribe({
      next: (res: any) => {
        console.log(res.data.user);
        this.userProfileData.set(res.data.user); // تخزين الـ Object
        localStorage.setItem('socialUser', JSON.stringify(res.data.user));
        if (res.data.user?._id) {
          this.getUserPostsCount(res.data.user._id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserPostsCount(userId: string) {
    this.profileService.getUserPosts(userId).subscribe({
      next: (res: any) => {
        const posts = res?.data?.posts || [];
        this.myPostsCount.set(posts.length);
      },
      error: (err) => console.log(err),
    });
  }

  uploadPhoto(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target?.files && target.files[0]) {
      this.uploadProfilePicService.uploadProfilePicture(target.files[0]).subscribe({
        next: (res) => {
          console.log(res);
          this.getProfileData();
        },
        error: (err) => console.log(err),
      });
    }
  }
}
