import {AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {Role} from '../../entities/role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordMatchValidator} from '../../service/password.match.validator';
import {InitDate} from '../../service/init.date';

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
  changePassword: boolean = false;
  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
      this.role = new Role();
  }


  ngOnInit() {
    this.initUpdDate();
    this.getUserDetail();
    this.initUpdUserForms();
  }

  initUpdDate(){
    for (let i: number = 1; i <= 31; i++){
      let day: string = i.toString();
      if (i < 10) {
        day = '0' + day;
      }
      this.days.push(day);
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
        InitDate(this.updUserForm, 'day','month', 'year',  user.birthDate);
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

  initPassword(){
    this.changePassword = true;
    this.updUserForm.get('password').setValidators(Validators.required);
    this.updUserForm.get('newPassword').setValidators([Validators.required, Validators.minLength(6)]);
    this.updUserForm.get('confirmPassword').setValidators(Validators.required);
    this.updUserForm.setValidators(PasswordMatchValidator('newPassword', 'confirmPassword'));
  }

  setNewPassword(){
    let currentUsersName = this.authenticationService.currentUserValue.username;
    let oldPs: string = this.updUserForm.get('password').value;
    let newPs: string =  this.updUserForm.get('newPassword').value;
    let newConfirmPs: string = this.updUserForm.get('confirmPassword').value;
    this.updUserForm.get('password').clearValidators();
    this.updUserForm.get('newPassword').clearValidators();
    this.updUserForm.get('confirmPassword').clearValidators();
    this.authenticationService.changeOldPassword(currentUsersName, oldPs, newPs, newConfirmPs).subscribe();
   // this.changePassword = false;
  }

  setBirthDateValue() {
    return this.updUserForm.get('day').value + '/'
    + this.updUserForm.get('month').value + '/'
    + this.updUserForm.get('year').value;
  }


  updateUser(){
    this.user.roles = [this.role.admin];
    this.user.birthDate = this.setBirthDateValue();
    if (this.updUserForm.valid) {
      this.authenticationService.updateUser(this.username, this.user).subscribe();
    }
  }
}
