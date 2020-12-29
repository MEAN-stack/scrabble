import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginForm.disable();
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (response) => {
        console.log("JWT: " + response.jwt);
        localStorage.setItem('jwt', response.jwt);
        this.router.navigate(['../game-page']);
      },
      (err) => {
        console.log(err);
        this.loginForm.enable();
      },
      () => {
        this.loginForm.enable();
      }
    );
  }
}
