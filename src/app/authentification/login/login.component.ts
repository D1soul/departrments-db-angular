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

  username: string;
  password: string;
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

  authorize(){
    //if (this.loginForm.valid) {
      this.authenticationService.login(this.username, this.password).subscribe(result => { this.goToAllSubDepartments();});


    //}
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
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
