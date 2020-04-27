import {AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {Role} from '../../entities/role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first, last, map, tap} from 'rxjs/operators';
import {toBase64String} from '@angular/compiler/src/output/source_map';
import {encode} from 'querystring';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, DoCheck {

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

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
      this.currentUser = authenticationService.currentUserValue;
  }


  ngOnInit() {
    this.initUpdDate();
    this.getUserDetail();
    this.initUpdUserForm();
  }

  ngDoCheck(): void {
   this.setBirthDateValue();
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

 //   for (let i = (this.date.getFullYear() - 18); i > (this.date.getFullYear() - 100); i--) {
    for (let i = this.date.getFullYear(); i > (this.date.getFullYear() - 100); i--) {
      this.years.push(i);
    }
  }

  public getUserDetail(){
    this.username = this.route.snapshot.params['username'];
  /*  this.authenticationService.getUserDetails(this.username)
      .subscribe(user => {this.user = user; this.birthDate = user.birthDate;
      this.oldPassword = atob(user.password)} ); */
    this.authenticationService.getUserDetails(this.username).subscribe(
      user => {this.user = user; this.birthDate = user.birthDate;  });
  }

  checkOldPassword(){
   // let ps = window.atob(this.oldPassword);
 //       console.log(toBase64String('this.oldPassword') );
  }

  initUpdUserForm(){
    this.updUserForm = this.formBuilder.group({
        username: [null, [Validators.required,
          Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
          Validators.minLength(1),
          Validators.maxLength(20)]],
        password: [null, [Validators.required,
          Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required]],
        day: [null],
        month: [null],
        year: [null],
        gender: [null, [Validators.required]],
        roles: [null, [Validators.required]]
      },
      {
      //  validators: PasswordMatchValidator('password', 'confirmPassword')
      }
    );
   // this.setBirthDateValue();
 //   console.log('initUpdUserForm: ' + this.birthDate + '=' + this.user.birthDate);
  }

  setBirthDateValue() {
      let birthDateValue = this.birthDate.split('/');
      let day = birthDateValue[0];
      let month = birthDateValue[1];
      let year = birthDateValue[2];
      this.updUserForm.controls['day'].setValue(day);
      this.updUserForm.controls['month'].setValue(month);
      this.updUserForm.controls['year'].setValue(year);
  }



  updateUser(){
    //this.user.roles.push('admin');
    this.user.roles = ['user', 'admin'];
    if (this.updUserForm.valid) {
      this.authenticationService.updateUser(this.username, this.user).subscribe();
    }
  }





}
