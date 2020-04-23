import { Component, OnInit } from '@angular/core';
import {User} from '../../entities/user';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  regForm: FormGroup;
  equalPassword: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(){
    this.regForm = this.formBuilder.group({
      "username": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
        Validators.minLength(1),
        Validators.maxLength(20)]],
      "password": [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]],
      "confirmPassword": [null, [Validators.required]],
      "birthDate": [null, [Validators.required,
        Validators.pattern("^\\d{2}/((января)|(февраля)"
          + "|(марта)|(апреля)|(мая)|(июня)|(июля)"
          + "|(августа)|(сентября)|(октября)"
          + "|(ноября)|(декабря))/\\d{4}$")]],

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
    this.authenticationService.addUser(this.user)
      .subscribe(result => this.goToAllUsers());
  }


 /* passwordMatchValidator(validGroup: FormGroup) {
    let password: string = validGroup.get('password').value;
    let confirmPassword: string = validGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { NotEquals: true }
  } */



  goToAllUsers(){
    this.router.navigate(['/users']);
  }
}

export function PasswordMatchValidator(password: string, confirmPassword: string) {
  return (matchForm: FormGroup) => {
    const passwordValue  = matchForm.controls[password];
    const confirmPasswordValue = matchForm.controls[confirmPassword];

    if (passwordValue.value !== confirmPasswordValue.value) {
      confirmPasswordValue.setErrors({ mustMatch: true });
    } else {
      confirmPasswordValue.setErrors(null);
    }
  }
}

