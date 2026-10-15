import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  register(data: object): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/users/signup`, data);
  }

  login(data: object): Observable<any> {
    return this.httpClient.post(`${environment['Base-Url']}/users/signin`, data);
  }

  logout() {
    //
    localStorage.removeItem('socialToken');
    localStorage.removeItem('socialUser');
    this.router.navigate(['/login']);
  }
}
