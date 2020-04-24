import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import {Role} from '../../entities/role';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  role: Role;
  regForm: FormGroup;
  sfsa: Array<any>;
  days = [];

  months = [{id: 1, name:"января"},
            {id: 2, name:"февраля"},
            {id: 3, name:"марта"},
            {id: 4, name:"апреля"},
            {id: 5, name:"мая"},
            {id: 6, name:"июня"},
            {id: 7, name:"июля"},
            {id: 8, name:"августа"},
            {id: 9, name:"сентября"},
            {id: 10, name:"октября"},
            {id: 11, name:"ноября"},
            {id: 12, name:"декабря"}
  ];
  birthDate = 'asfsf';
  years = [];
  date = new Date();




  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
    this.role = new Role();
    for (let i = 1; i <= 31; i++){
      this.days.push(i);
    }

    for (let i = (this.date.getFullYear() - 18); i > (this.date.getFullYear() - 100); i--) {
      this.years.push(i);
    }

  }

  ngOnInit(): void {

    this.initUserForm();


  //    this.birthDate = this.regForm.controls['days'].value + '/' + this.regForm.controls['days'].value;
    //this.updateDate('day' && 'month' && 'year' );
  }

  initUserForm(){
    this.regForm = this.formBuilder.group({
      "username": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
        Validators.minLength(1),
        Validators.maxLength(20)]],
      "password": [null, [Validators.required,
        Validators.minLength(6)]],
      "confirmPassword": [null, [Validators.required]],
      "day": [null],
      "month": [null],
      "year": [null],
      "birthDate": [null],
        /*   "birthDate": [null, [Validators.required,
             Validators.pattern("^\\d{2}/((января)|(февраля)"
               + "|(марта)|(апреля)|(мая)|(июня)|(июля)"
               + "|(августа)|(сентября)|(октября)"
               + "|(ноября)|(декабря))/\\d{4}$")]], */

      "gender": [null, [Validators.required,
        Validators.pattern("[male|female]")]],
      "roles": [null, [Validators.required]]
    },
      {
        validators: PasswordMatchValidator('password', 'confirmPassword')
      }
    );

  }

  values(){
    this.regForm.controls['birthDate'].setValue(this.birthDateValue);
    this.birthDate = this.regForm.controls['birthDate'].value;
 //   this.user.roles.push(this.role.admin);
  //  this.user.roles.push(this.role);


 //   this.regForm.controls['roles'].setValue("asfasf");
    this.user.birthDate = this.birthDate;
    return;
  }


  get birthDateValue() {
   return this.regForm.controls['day'].value + '/'
        + this.regForm.controls['month'].value + '/'
        + this.regForm.controls['year'].value;
  }

  addUser(){
    this.user.birthDate = this.regForm.controls['birthDate'].value;
    this.authenticationService.registration(this.user)
      .subscribe(result => this.goToAllUsers());
  }

  goToAllUsers(){
    this.router.navigate(['/users']);
  }


  showAll(){
    this.role.user = 'user';
    this.role.admin = 'admin';
    this.user.roles = this.role;

    this.sfsa.push(this.role);
    return;
  //  this.showAllAsJson = this.regForm.value;
  }

}

export function PasswordMatchValidator(password: string, confirmPassword: string) {
  return (matchForm: FormGroup) => {
    const passwordValue  = matchForm.controls[password];
    const confirmPasswordValue = matchForm.controls[confirmPassword];

    if (confirmPasswordValue.errors && !confirmPasswordValue.errors.notEqual) {
      return;
    }


    if (passwordValue.value !== confirmPasswordValue.value) {
      confirmPasswordValue.setErrors({ notEqual: true });
    } else {
      confirmPasswordValue.setErrors(null);
    }
  }
}
