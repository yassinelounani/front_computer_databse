import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInService implements CanActivate {

  constructor(private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem("currentUser")) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
