import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';


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
    return this.httpClient.post<any>(this.url, user, {headers: this.headers})
      .pipe(
        map(
          userData => {
            sessionStorage.setItem('username', user.username);
            console.log(userData);
            const tokenStr = 'Bearer ' + userData.token;
            console.log(tokenStr);
            sessionStorage.setItem('token', tokenStr);
            return userData;
          }
        )
      );
  }
  isUserLoggedIn() {
    const user = sessionStorage.getItem('username')
    console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    localStorage.removeItem('username');
  }
}
