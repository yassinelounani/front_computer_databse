import { Injectable } from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {UserService} from './user.service';
import {throwError} from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log(sessionStorage.getItem('username'))
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token') != null ) {
      console.log('entring to handling');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${sessionStorage.getItem('token')}`
      });
      console.log(headers);
      request = request.clone({headers});
    }
    console.log('handling request');
    return next.handle(request);
  }
}
