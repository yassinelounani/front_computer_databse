import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/cdb-webapp/user';

  constructor(private httpClient: HttpClient) {
  }

  login(user: User) {
    return this.httpClient.post<User>(this.url, {user})
      .pipe(map(newUser => {
        if (newUser) { // store user details and basic auth credentials in local storage
          user.authdata = window.btoa(newUser.username + ':' + newUser.password);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
        }
        return newUser;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
