import {AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {Role} from '../../entities/role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordMatchValidator} from '../../service/password.match.validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User;
  role: Role;
  updUserForm: FormGroup;
  birthDate: string = '';
  days = [];
  months = [];
  years = [];
  date = new Date();
  username: string;
  submitted: boolean = true;
  currentUser: any;
  changePassword: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
      this.currentUser = authenticationService.currentUserValue;
      this.role = new Role();
  }


  ngOnInit() {
    this.initUpdDate();
    this.getUserDetail();
    this.initUpdUserForms();
    this.getBirthDateValue();
  }

  initUpdDate(){
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

    for (let i = this.date.getFullYear(); i > (this.date.getFullYear() - 100); i--) {
      this.years.push(i);
    }
  }

  public getUserDetail(){
    this.username = this.route.snapshot.params['username'];
    this.authenticationService.getUserDetails(this.username)
      .subscribe(user => {
        this.user = user;
        this.birthDate = user.birthDate;
        this.setBirthDateValue();
      });
  }

  initUpdUserForms(){
    this.updUserForm = this.formBuilder.group({
        username: [null, [Validators.required,
          Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
          Validators.minLength(1),
          Validators.maxLength(20)]],
      oldPassword: [null],
      newPassword: [null],
      confirmPassword: [null],
        day: [null],
        month: [null],
        year: [null],
        gender: [null, [Validators.required]],
        roles: [null, [Validators.required]]
      }
    );

   /* this.changePasswordForm = this.formBuilder.group({
      password: [null, [Validators.required,
        Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    },
    {
      validators: PasswordMatchValidator('password', 'confirmPassword')
    }); */
  }

  setBirthDateValue() {
      let birthDateValue = this.birthDate.split('/');
      let day  = birthDateValue[0];
      let month = birthDateValue[1];
      let year = birthDateValue[2];
      this.updUserForm.controls['day'].setValue(day);
      this.updUserForm.controls['month'].setValue(month);
      this.updUserForm.controls['year'].setValue(year);
  }

  initPassword(){
    this.changePassword = true;
    this.updUserForm.controls['oldPassword'].setValidators(Validators.required);
    this.updUserForm.controls['newPassword'].setValidators([Validators.required, Validators.minLength(6)]);
    this.updUserForm.controls['confirmPassword'].setValidators(Validators.required);
    this.updUserForm.setValidators(PasswordMatchValidator('newPassword', 'confirmPassword'));
  }

  setNewPassword(){
     let pa =   this.updUserForm.get('oldPassword').value;
  }

  getBirthDateValue() {
    return this.updUserForm.controls['day'].value + '/'
    + this.updUserForm.controls['month'].value + '/'
    + this.updUserForm.controls['year'].value;
  }


  updateUser(){
    this.user.roles = [this.role.admin];
    this.user.birthDate = this.getBirthDateValue();
   // if (this.updUserForm.valid) {
      this.authenticationService.updateUser(this.username, this.user).subscribe();
 //   }
  }
}
