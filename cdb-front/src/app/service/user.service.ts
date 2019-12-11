import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/cdb-webapp/login';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<any>(this.url, user, { headers: this.headers })
      .pipe(
        map(
          userData => {
            sessionStorage.setItem('username', JSON.stringify(userData));
            const tokenStr = 'Bearer ' + userData.token;
            sessionStorage.setItem('token', tokenStr);
            return userData;
          }
        )
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('role');
    return (user === 'user');
  }

  isAdminLoggedIn() {
    const admin = sessionStorage.getItem('role');
    return (admin === 'admin');
  }

  logout() {
    sessionStorage.removeItem('username');
  }
}
