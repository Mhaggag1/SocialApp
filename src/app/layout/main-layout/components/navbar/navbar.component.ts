import { Component, inject, OnInit, WritableSignal, signal } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/service/auth/auth.service';
import { User } from '../../../../user.interface';
import { ProfileService } from '../../../../feature/profile/profile.service';
import { UserData } from '../../../../feature/profile/user-data.interface';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  userProfileData: WritableSignal<UserData | null> = signal(null);

  ngOnInit(): void {
    const savedUser = localStorage.getItem('socialUser');
    if (savedUser) {
      this.userProfileData.set(JSON.parse(savedUser));
      setTimeout(() => initFlowbite());
    }
    this.getProfileData();
  }
  private readonly profileService = inject(ProfileService);

  getProfileData() {
    this.profileService.getProfileData().subscribe({
      next: (res: any) => {
        console.log(res.data.user);
        this.userProfileData.set(res.data.user); // تخزين الـ Object
        setTimeout(() => initFlowbite());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  navbarLogout() {
    this.authService.logout();
  }
}
