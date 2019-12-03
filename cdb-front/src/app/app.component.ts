import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router,private userService: UserService){}

  goToComputers(){
    this.router.navigate(['/computers']);
  }

  goToCompanies(){
    console.log(this.router.url)
    this.router.navigate(['/companies']);
  }

  logOut(){
    this.userService.logout();
  }
}
