import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted: boolean = false;
  message: string;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm(){
    this.forgotPasswordForm = this.formBuilder.group({
      email : [null, [Validators.required,
                      Validators.email]]
    });
  }

  getUsersEmail(){
    let email = this.forgotPasswordForm.get('email').value;
    this.authenticationService.getUsersEmail(email).subscribe(result =>{
      this.message = result;
      console.log(result);
    }, error => {
      this.message = error;
    });
  }
}
