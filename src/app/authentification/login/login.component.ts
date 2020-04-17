import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {username: string, password: string};
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  /*
   .subscribe(res => {
      console.log(res);
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['products']);
      }
   */

  authorize(){
 // if (this.loginForm.valid) {
      this.authenticationService.login(this.user).subscribe(res => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.goToAllSubDepartments();
        }
      }, (err) => {
          console.log(err);
        });
   // }
  }

  goToAllSubDepartments(){
    this.router.navigate(['main_departments']);
  }

  /*
  onFormSubmit(form: NgForm) {
  this.authService.login(form)
    .subscribe(res => {
      console.log(res);
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['products']);
      }
    }, (err) => {
      console.log(err);
    });
}
   */
}
