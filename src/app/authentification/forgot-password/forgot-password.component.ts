import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  showSpinner: boolean = false;
  showForgotPassword: boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.createForgotPasswordForm();
    this.getForgotPasswordFrmValue();
  }

  createForgotPasswordForm(){
    this.forgotPasswordForm = this.formBuilder.group({
      email : [null, [Validators.required,
                      Validators.email]]
    });
  }

  getForgotPasswordFrmValue(){
    this.forgotPasswordForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  getUsersEmail(){
    let email = this.forgotPasswordForm.get('email').value;
    this.submitted = true;
    if (this.forgotPasswordForm.valid) {
      this.errorMessage = null;
      this.authenticationService.sendResetPasswordTokenToEmail(email).subscribe(result => {
        this.successMessage = result;
      }, error => {
        this.errorMessage = error;
      });

      setTimeout(() => {
        if (this.errorMessage){
            this.showForgotPassword = true;
            this.showSpinner = false;
        }

        else if (!this.errorMessage){
          this.showForgotPassword = false;
          this.showSpinner = true;
        }

      }, 100);
    }
  }
}
