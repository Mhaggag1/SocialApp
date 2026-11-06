import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComments(postId: any): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/posts/${postId}/comments`);
  }

  createComment(postId: any, body: any): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/posts/${postId}/comments`, body);
  }
}
