import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
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
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }
    console.log('handling request');
    return next.handle(request);
  }
}
