import { Injectable } from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from './user.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token') != null ) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${sessionStorage.getItem('token')}`
      });
      request = request.clone({headers});
    }
    return next.handle(request);
  }
}
