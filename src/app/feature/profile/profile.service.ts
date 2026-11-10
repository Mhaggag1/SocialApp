import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);
  getProfileData(): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/users/profile-data`);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/users/${userId}/profile`);
  }

  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/users/${userId}/posts`);
  }

  getBookmarks(): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/users/bookmarks`);
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.httpClient.put(`${environment['Base-Url']}/users/upload-photo`, formData);
  }
}
