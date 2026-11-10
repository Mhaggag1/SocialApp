import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuggestedService {
  private readonly httpClient = inject(HttpClient);
  getSuggested(): Observable<any> {
    return this.httpClient.get(`${environment['Base-Url']}/users/suggestions?limit=10`);
  }

  followUser(userId: string): Observable<any> {
    return this.httpClient.put(`${environment['Base-Url']}/users/${userId}/follow`, {});
  }
}
