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



  authorize(){
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.username, this.password).subscribe(user => {

          this.goToAllSubDepartments();

      }, (err) => {
          console.log(err);
        });
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['main_departments']);
  }
}
