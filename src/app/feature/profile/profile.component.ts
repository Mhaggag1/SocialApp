import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ProfileService } from './profile.service';
import { UserData } from './user-data.interface';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);

  // 1. غيرناها من UserData[] إلى UserData | null لأنها Object واحد
  userProfileData: WritableSignal<UserData | null> = signal(null);

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.profileService.getProfileData().subscribe({
      next: (res: any) => {
        console.log(res.data.user);
        this.userProfileData.set(res.data.user); // تخزين الـ Object
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
