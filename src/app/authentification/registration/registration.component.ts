import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
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
  days = [];
  months = [];
  years = [];

  userRole: Role.user;

  date = new Date();
  submitted: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
  //  this.role = new Role();
  }
  ngOnInit(): void {

  //  this.user.roles.push(this.userRole);

    this.initRegDate();
    this.initRegUserForm();
  }

  initRegDate(){
    for (let i = 1; i <= 31; i++){
      this.days.push(i);
    }

    this.months = [
      {id: 1, name: 'января'},
      {id: 2, name: 'февраля'},
      {id: 3, name: 'марта'},
      {id: 4, name: 'апреля'},
      {id: 5, name: 'мая'},
      {id: 6, name: 'июня'},
      {id: 7, name: 'июля'},
      {id: 8, name: 'августа'},
      {id: 9, name: 'сентября'},
      {id: 10, name: 'октября'},
      {id: 11, name: 'ноября'},
      {id: 12, name: 'декабря'}
    ];

    for (let i = (this.date.getFullYear() - 18); i > (this.date.getFullYear() - 100); i--) {
      this.years.push(i);
    }


  }

  initRegUserForm(){
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
      }
    );
  }




   getBirthDateValue() {
   return this.regForm.controls['day'].value + '/'
        + this.regForm.controls['month'].value + '/'
        + this.regForm.controls['year'].value;
  }

  register(){
    this.submitted = true;
    this.user.birthDate = this.getBirthDateValue();
    this.user.roles = [ "user" ];
        if (this.regForm.valid) {
          this.authenticationService.registration(this.user)
        .subscribe(() => this.goToAllUsers());
    }

  }


  goToAllUsers(){
    this.router.navigate(['/user_detail/', this.user.username]);
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
