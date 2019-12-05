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
    document.getElementById("company").className = "item left";
    document.getElementById("computer").className += " active";
  }

  goToCompanies(){
    this.router.navigate(['/companies']);
    document.getElementById("computer").className = "item left";
    document.getElementById("company").className += " active";
  }

  logOut(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
