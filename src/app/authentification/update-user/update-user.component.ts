import {AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {Role} from '../../entities/role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordMatchValidator} from '../../service/password.match.validator';
import {GetBirthDate} from '../../service/get.birth.date';
import {InitBirthDate} from '../../service/init.birth.date';
import {SetBirthDate} from '../../service/set.bitrh.date';

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
  username: string;
  submitted: boolean = true;
  changePassword: boolean = false;
  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
      this.role = new Role();
  }

  ngOnInit() {
    InitBirthDate(this.days, this.months, this.years);
    this.getUserDetail();
    this.initUpdUserForms();
  }

  public getUserDetail(){
    this.username = this.route.snapshot.params['username'];
    this.authenticationService.getUserDetails(this.username)
      .subscribe(user => {
        this.user = user;
        GetBirthDate(this.updUserForm, 'day','month', 'year',  user.birthDate);
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

  updateUser(){
    this.user.roles = [this.role.admin];
    this.user.birthDate = SetBirthDate(this.updUserForm, 'day', 'month', 'year');
    if (this.updUserForm.valid) {
      this.authenticationService.updateUser(this.username, this.user).subscribe();
    }
  }
}
