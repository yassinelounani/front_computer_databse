import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/cdb-webapp/login';

  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user)
      .pipe(map(newUser => {
        if (newUser) {
          window.btoa(newUser.username + ':' + newUser.password);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
        }
        return newUser;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
