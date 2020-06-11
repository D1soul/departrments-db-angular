import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../entities/role';
import { PasswordMatchValidator } from '../../service/password-match.validator';
import { InitDateFunction } from '../../service/init-date.function';
import { fadeInAndOutRightAnimation } from '../../animation/fade-in-and-out-right-animation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [fadeInAndOutRightAnimation],
  host: { '[@fadeInAndOutRightAnimation]': '' }
})
export class RegistrationComponent implements OnInit {

  user: User;
  role: Role;
  regForm: FormGroup;
  days = [];
  months = [];
  years = [];
  submitted: boolean = false;
  errorMessage: string = '';
  inputName: string = '';
  changePasswordType: boolean = false;
  changeConfirmPasswordType: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private elementRef: ElementRef) {
    this.user = new User();
    this.role = new Role();
  }
  ngOnInit(): void {
    InitDateFunction(this.days, this.months, this.years);
    this.createRegUserForm();
    this.getRegUserFormValue();
    this.getRegUserFocusedElementName();
  }

  createRegUserForm(){
    this.regForm = this.formBuilder.group({
      username: [null, [Validators.required,
                        Validators.pattern("^((\\d*[А-я]+\\d*)+|(\\d*[A-z]+\\d*)+)$"),
                        Validators.maxLength(20)]],
      email: [null, [Validators.email,
                     Validators.required]],
      password: [null, [Validators.required,
                        Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
      day: [null, [Validators.required]],
      month: [null, [Validators.required]],
      year: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    },
      {
        validators: PasswordMatchValidator('password', 'confirmPassword')
    });
  }

  getRegUserFormValue(){
    this.regForm.valueChanges.subscribe((formData) => {
      this.errorMessage = null;
      let data = new Date(formData.year, this.months.indexOf(formData.month)+1, 0);
      if(formData.day > data.getDate() ) {
        this.regForm.get('day').setValue(data.getDate());
        return;
      }
      setTimeout(() => {
        let regUser = this.user;
        regUser.username = formData.username;
        regUser.email = formData.email;
        regUser.password = formData.password;
        regUser.confirmPassword = formData.confirmPassword;
        regUser.birthDate = formData.day + '/'
                          + formData.month + '/'
                          + formData.year;
        regUser.gender = formData.gender;
        regUser.isBanned = false;
        regUser.roles = [this.role.user];
      });
    });
  }

  getRegUserFocusedElementName(){
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

  register(){
    this.submitted = true;
    if (this.regForm.valid) {
      this.authenticationService.registration(this.user)
        .subscribe(() => this.goToLogIn(), error => {
          this.errorMessage = error;
          this.regForm.setErrors( {'error': true});
        });
    }
  }

  goToLogIn(){
    this.router.navigate(['/login']).then();
  }
}





