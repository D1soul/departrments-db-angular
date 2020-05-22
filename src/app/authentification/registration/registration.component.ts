import {Component, ElementRef, OnInit} from '@angular/core';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../entities/role';
import { PasswordMatchValidator } from '../../service/password-match.validator';
import { InitDateFunction } from '../../service/init-date.function';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
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
        Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
        Validators.minLength(1),
        Validators.maxLength(20)]],
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
      let data = new Date(formData.year, this.months.indexOf(formData.month)+1, 0);
      if(formData.day > data.getDate() ) {
        this.regForm.get('day').setValue(data.getDate());
        return;
      }
      setTimeout(() => {
        let regUser = this.user;
        regUser.username = formData.username;
        regUser.password = formData.password;
        regUser.confirmPassword = formData.confirmPassword;
        regUser.birthDate = formData.day + '/'
                          + formData.month + '/'
                          + formData.year;
        regUser.gender = formData.gender;
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
   // this.user.roles = [this.role.user];
    if (this.regForm.valid) {
      this.authenticationService.registration(this.user)
        .subscribe(() => this.goToAllUsers(), (err) => {
        //  this.errorMessage = this.authenticationService.errorMessage;
          this.errorMessage = err;
          this.regForm.get('username').setErrors( {'thisUsernameIsTaken': true});
        });
    }
  }

  goToAllUsers(){
    this.router.navigate(['/user_detail/', this.user.username]);
  }
}





