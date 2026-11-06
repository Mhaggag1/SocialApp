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
}
