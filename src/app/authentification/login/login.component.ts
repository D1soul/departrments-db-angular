import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../entities/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {


   // if (this.authenticationService.currentUserValue) {
  //    this.router.navigate(['/']);
  //  }

  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }


  get form(){
    return this.loginForm.controls;
  }
  authorize(){
    this.username = this.loginForm.controls.username.value;
    this.password = this.loginForm.controls.password.value;
    if (this.loginForm.valid) {
      //localStorage.removeItem('token');
      this.authenticationService.login(this.username, this.password).subscribe(user => {

     // this.token = localStorage.getItem('token');


        //  this.goToAllSubDepartments();
      //  if (user.token) {
        //  localStorage.setItem('token', user.token);
         // this.token = this.authenticationService.getJwtToken();
          //this.goToAllSubDepartments();
      //  }
      }, (err) => {
          console.log(err);
        });
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['sub-dept_employees']);
  }
}
