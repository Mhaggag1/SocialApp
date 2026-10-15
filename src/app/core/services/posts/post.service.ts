import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/posts`, this.myHeaders);
  }

  createPost(body: any): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/posts`, body, this.myHeaders);
  }

  getSinglePost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/posts/${postId}`, this.myHeaders);
  }

  deletePost(postId: any): Observable<any> {
    return this.httpClient.delete(`${environment['Base-Url']}/posts/${postId}`, this.myHeaders);
  }
}
