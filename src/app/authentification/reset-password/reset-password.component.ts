import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from '../../service/password-match.validator';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  resetPasswordForm: FormGroup;
  errorMessage: string;
  errorMessageByUrl: string;
  inputName: string = '';
  submitted: boolean = false;
  changeNewPasswordType: boolean = false;
  changeConfirmPasswordType: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.getTokenOrError();
    this.createResetPasswordForm();
    this.getRFPFocusedElementName();
  }

  getTokenOrError(){
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token){
      console.log(this.token);
    }
    else {
      this.errorMessageByUrl = this.route.snapshot.queryParams['error'];
    }
  }

  createResetPasswordForm(){
    this.resetPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required,
                       Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    }, {
      validators: PasswordMatchValidator('password', 'confirmPassword')
    })
  }

  getRFPFocusedElementName(){
    setTimeout(()=>{
      let elements = [].slice.call((this.elementRef.nativeElement)
        .querySelectorAll('[formControlName]'));
      elements.forEach( element =>{
        element.addEventListener('focus', () => {
          this.inputName = element.id;
        });
        element.addEventListener('blur', () => {
          this.inputName = '';
        })
      });
    }, 50);
  }

  resetForgottenPassword() {
    let password = this.resetPasswordForm.get('password').value;
    let confirmPassword = this.resetPasswordForm.get('confirmPassword').value;
    this.submitted = true;
    if (this.token) {
      if (this.resetPasswordForm.valid) {
        this.authenticationService.resetPasswordByToken(password, confirmPassword, this.token).subscribe(
          () => {
            this.goToLogin();
          },
          error => {
            this.errorMessage = error;
        });
      }
    }
  }

  goToForgotPassword(){
    this.router.navigate(['/forgot-password']).then();
  }

  goToLogin(){
    this.router.navigate(['/login']).then();
  }

}
