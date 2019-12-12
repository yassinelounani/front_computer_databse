import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../model/user.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInService implements CanActivate {
  user: User;
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = JSON.parse(sessionStorage.getItem('username'));
    if (this.isHasRoleAdmin(this.user)) {
      return true;
    } else {
      this.router.navigate(['/computers'])
      return false;
    }

  }
  isHasRoleAdmin(user: User): boolean {
    return user.roles.includes('ROLE_ADMIN');
  }
}
