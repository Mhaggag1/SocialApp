import { Routes } from '@angular/router';
import { AuthAuthLayoutComponent } from './layout/auth-auth-layout/auth-auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { FeedComponent } from './feature/feed/feed.component';
import { ProfileComponent } from './feature/profile/profile.component';
import { NotificationsComponent } from './feature/notifications/notifications.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { isAllowedAuthGuard } from './core/auth/guard/is-allowed-auth-guard';
import { alreadyLoggedGuard } from './core/auth/guard/already-logged-guard';
import { PostdetailsComponent } from './feature/postdetails/postdetails.component';
import { MyPostsComponent } from './feature/profile/my-posts/my-posts.component';
import { SavedPostsComponent } from './feature/profile/saved-posts/saved-posts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: AuthAuthLayoutComponent,
    canActivate: [alreadyLoggedGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    canActivate: [isAllowedAuthGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'post-details/:id', component: PostdetailsComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'myposts', component: MyPostsComponent },
          { path: 'savedposts', component: SavedPostsComponent },
        ],
      },
      { path: 'notifications', component: NotificationsComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
