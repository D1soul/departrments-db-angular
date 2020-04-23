import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  regForm: FormGroup;
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

  years = [];
  date = new Date();
  day ='';
  month ='';
  year ='';





  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();

    for (let i = (this.date.getFullYear() - 18); i > (this.date.getFullYear() - 100); i--) {
      this.years.push(i);
    }


  }

  ngOnInit(): void {
    for (let i = 1; i <= 31; i++){
      this.days.push(i);
    }
    this.initUserForm();
    this.updateDate('day' && 'month' && 'year' );
  }


  updateDate = function (input){
    if (input == "year"){
      this.month = "";
      this.day = "";
    }
    else if (input == "month"){
      this.day = "";
    }
    if (this.year && this.month && this.day){
     // $scope.fieldValues.dateOfBirth = new Date($scope.year, $scope.month.id - 1, $scope.day);
    }
  };


  initUserForm(){
    this.regForm = this.formBuilder.group({
      "username": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
        Validators.minLength(1),
        Validators.maxLength(20)]],
      "password": [null, [Validators.required,
        Validators.minLength(6)]],
      "confirmPassword": [null, [Validators.required]],
      "days": [null],
      "months": [null],
      "years": [null],
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

  addUser(){
    this.authenticationService.registration(this.user)
      .subscribe(result => this.goToAllUsers());
  }

  goToAllUsers(){
    this.router.navigate(['/users']);
  }
}

export function PasswordMatchValidator(password: string, confirmPassword: string) {
  return (matchForm: FormGroup) => {
    const passwordValue  = matchForm.controls[password];
    const confirmPasswordValue = matchForm.controls[confirmPassword];

    if (confirmPasswordValue.errors && !confirmPasswordValue.errors.notEqual) {
      // return if another validator has already found an error on the matchingControl
      return;
    }


    if (passwordValue.value !== confirmPasswordValue.value) {
      confirmPasswordValue.setErrors({ notEqual: true });
    } else {
      confirmPasswordValue.setErrors(null);
    }
  }
}

