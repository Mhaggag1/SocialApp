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

  createPost(body: any): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/posts`, body);
  }

  getSinglePost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/posts/${postId}`);
  }

  deletePost(postId: any): Observable<any> {
    return this.httpClient.delete(`${environment['Base-Url']}/posts/${postId}`);
  }

  bookmarkPost(postId: any): Observable<any> {
    return this.httpClient.put(`${environment['Base-Url']}/posts/${postId}/bookmark`, {});
  }
}
