import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  blackState:boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    console.log("init");
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.user = this.loginForm.getRawValue();
    console.log(this.user);
    this.userService.login(this.user).subscribe(() => { this.router.navigate(['/computers']);});
  }

  getErrorMessage(field: string) {
    if (field === 'username') {
      return this.loginForm.get(field).hasError('required') ? 'You must enter a username' : '';
    }
    else {
      return this.loginForm.get(field).hasError('required') ? 'You must enter a password' : '';
    }
  }

}
