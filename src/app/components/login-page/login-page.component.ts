import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  indexPosition: number = 0;

  constructor(private service: UserService, private route: Router) {}

  ngOnInit(): void {}

  userRegestration = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userLogin = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  onLogin() {
    this.service.userLogin(this.userRegestration.value).subscribe((data) => {
      localStorage.setItem('name', data.data.fullName);
      localStorage.setItem('token', data.data.token);
      this.route.navigateByUrl('/dashBoard');
    });
  }
  onSignUp() {
    this.service.userRegister(this.userLogin.value).subscribe((data) => {
      this.indexPosition = 0;
    });
  }
}
