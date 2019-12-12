import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {User} from '../model/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isAuth: boolean;
  private isAdmin: boolean;
  user: User;
  userSubscription: Subscription;
  authSubscription: Subscription;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.isAuth = false;
    this.isAdmin = false;
    this.authSubscription = this.userService.authSubject.subscribe(
      (response: boolean) => {
        this.isAuth = response;
        console.log(this.isAuth);
      },
      (error) => {
        console.log('Erreur de chargement User' + error);

      }
    );

    this.userSubscription = this.userService.userSubject.subscribe(
      (response: User) => {
        this.user = response;
        this.isAdmin = this.hasRolesAdmin(response);
        console.log(this.user);
      },
      (error) => {
        console.log('Erreur de chargement User' + error);

      }
    );
  }

  goToComputers() {
    this.router.navigate(['/computers']);
    document.getElementById('company').className = 'item left';
    document.getElementById('computer').className += ' active';
  }

  goToCompanies() {
    this.router.navigate(['/companies']);
    document.getElementById('computer').className = 'item left';
    document.getElementById('company').className += ' active';
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  hasRolesAdmin(user: User): boolean {
    return user.roles.includes('ROLE_ADMIN');
  }
}
