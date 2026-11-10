import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComments(postId: any, page: number = 1, limit: number = 10): Observable<any> {
    return this.httpClient.get(
      `${environment['Base-Url']}/posts/${postId}/comments?page=${page}&limit=${limit}`,
    );
  }

  createComment(postId: any, body: any): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/posts/${postId}/comments`, body);
  }

  getCommentReplies(
    postId: any,
    commentId: any,
    page: number = 1,
    limit: number = 10,
  ): Observable<any> {
    return this.httpClient.get(
      `${environment['Base-Url']}/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
    );
  }

  createReply(postId: any, commentId: any, body: any): Observable<any> {
    return this.httpClient.post(
      `${environment['Base-Url']}/posts/${postId}/comments/${commentId}/replies`,
      body,
    );
  }

  updateComment(postId: any, commentId: any, body: any): Observable<any> {
    return this.httpClient.put(
      `${environment['Base-Url']}/posts/${postId}/comments/${commentId}`,
      body,
    );
  }

  deleteComment(postId: any, commentId: any): Observable<any> {
    return this.httpClient.delete(
      `${environment['Base-Url']}/posts/${postId}/comments/${commentId}`,
    );
  }

  likeComment(postId: any, commentId: any): Observable<any> {
    return this.httpClient.put(
      `${environment['Base-Url']}/posts/${postId}/comments/${commentId}/like`,
      {},
    );
  }
}
