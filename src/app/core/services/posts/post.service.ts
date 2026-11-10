import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/posts`);
  }

  getHomeFeed(only: string = 'following', limit: number = 10): Observable<any> {
    return this.httpClient.get(
      `${environment['Base-Url']}/posts/feed?only=${only}&limit=${limit}`,
    );
  }

  createPost(body: any): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/posts`, body);
  }

  getSinglePost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/posts/${postId}`);
  }

  getPostLikes(postId: any, page: number = 1, limit: number = 20): Observable<any> {
    return this.httpClient.get(
      `${environment['Base-Url']}/posts/${postId}/likes?page=${page}&limit=${limit}`,
    );
  }

  updatePost(postId: any, body: any): Observable<any> {
    return this.httpClient.put(`${environment['Base-Url']}/posts/${postId}`, body);
  }

  deletePost(postId: any): Observable<any> {
    return this.httpClient.delete(`${environment['Base-Url']}/posts/${postId}`);
  }

  likePost(postId: any): Observable<any> {
    return this.httpClient.put(`${environment['Base-Url']}/posts/${postId}/like`, {});
  }

  bookmarkPost(postId: any): Observable<any> {
    return this.httpClient.put(`${environment['Base-Url']}/posts/${postId}/bookmark`, {});
  }

  sharePost(postId: any, body: object = {}): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/posts/${postId}/share`, body);
  }

  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/users/${userId}/posts`);
  }
}
