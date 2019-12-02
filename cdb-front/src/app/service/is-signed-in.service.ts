import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInService implements CanActivate {

  constructor(private router: Router,) { }

  isConected:Boolean = true;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.isConected) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
