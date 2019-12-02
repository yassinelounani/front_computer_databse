import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private fb: FormBuilder,rooter: Router) { }

  ngOnInit() {
    this.loginForm=this.fb.group({
      username:["",Validators.required],
      password:["",Validators.required]
    })
  }

  onSubmit(){
    
  }

}
