import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
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

}
