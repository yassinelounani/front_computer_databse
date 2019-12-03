import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {User, UserModel} from '../model/user.model';
import {UserService} from '../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  user: User;
  form: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    this.user = this.form.getRawValue();
    console.log(this.user);
    this.userService.login(this.user).subscribe();
    console.log(this.user);
  }

}
