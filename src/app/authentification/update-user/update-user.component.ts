import { Component, ElementRef, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {Role} from '../../entities/role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PasswordMatchValidator} from '../../service/password-match.validator';
import {InitDateFunction} from '../../service/init-date.function';

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
  currentUser: string;
  changePassword: boolean = false;
  errorMessage: string;
  inputName: string = '';
  submitted: boolean = false;


  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private elementRef: ElementRef) {
      this.role = new Role();
  }

  ngOnInit() {
    this.getUserDetail();
    InitDateFunction(this.days, this.months, this.years);
    this.createUpdUserForms();
    this.getUpdUserFormValue();
    this.getUpdUserFocusedElementName();
  }

  public getUserDetail(){
    this.username = this.route.snapshot.params['username'];
    this.authenticationService.getUserDetails(this.username)
      .subscribe(user => {
        this.user = user;
        this.initUpdUserForms(user);
        this.currentUser = this.authenticationService.currentUserValue.username;
      },
        error => this.errorMessage = error
      );
  }

  createUpdUserForms(){
    this.updUserForm = this.formBuilder.group({
        username: [null, [Validators.required,
                          Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
                          Validators.minLength(1),
                          Validators.maxLength(20)]],
        email: [null, [Validators.email,
                       Validators.required]],
        oldPassword: [{value: null, disabled: true},
                      [Validators.required]],
        newPassword: [{value: null, disabled: true},
                      [Validators.required, Validators.minLength(6)]],
        confirmPassword: [{value: null, disabled: true},
                      [Validators.required]],
        day: [null],
        month: [null],
        year: [null],
        gender: [null, [Validators.required]],
        roles: [null, [Validators.required]]
      },
      {
        validators: PasswordMatchValidator('newPassword', 'confirmPassword')
      });
  }

  initUpdUserForms(user) {
    let birthDateValue = user.birthDate.split('/');
    this.updUserForm.setValue({
      username: user.username,
      email: user.email,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      day: birthDateValue[0],
      month: birthDateValue[1],
      year: birthDateValue[2],
      gender: user.gender,
      roles: user.roles
    });
  }

  changingPassword(){
    if (this.changePassword) {
      this.updUserForm.get('oldPassword').enable();
      this.updUserForm.get('newPassword').enable();
      this.updUserForm.get('confirmPassword').enable();
    }
    if (!this.changePassword) {
      this.updUserForm.get('oldPassword').disable();
      this.updUserForm.get('newPassword').disable();
      this.updUserForm.get('confirmPassword').disable();
    }
  }


  getUpdUserFormValue(){
    this.updUserForm.valueChanges.subscribe((formData) => {
      let data = new Date(formData.year, this.months.indexOf(formData.month) + 1, 0);
      if(formData.day > data.getDate() ) {
        this.updUserForm.get('day').setValue(data.getDate());
        return;
      }
      setTimeout(() => {
        let updUser = this.user;
        updUser.username = formData.username;
        updUser.email = formData.email;
        updUser.birthDate = formData.day + '/'
                          + formData.month + '/'
                          + formData.year;
        updUser.gender = formData.gender;
        updUser.roles = [this.role.user];
      });
    });
  }

  getUpdUserFocusedElementName(){
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

  setNewPassword(){
    let currentUsersName = this.currentUser;
    let oldPs: string = this.updUserForm.get('oldPassword').value;
    let newPs: string =  this.updUserForm.get('newPassword').value;
    let newConfirmPs: string = this.updUserForm.get('confirmPassword').value;
    this.submitted = true;
    this.authenticationService.changeOldPassword(
      currentUsersName, oldPs, newPs, newConfirmPs).subscribe(()=> {
        this.changePassword = false;
    },error  => {
        this.errorMessage = error;
        this.updUserForm.get('oldPassword').setErrors({'notFound': true});
    });
  }

  updateUser(){
    this.user.roles = [this.role.admin];
    if (this.updUserForm.valid) {
      this.authenticationService.updateUser(this.username, this.user).subscribe(()=>
      this.goToAllUsers());
    }
  }


  goToAllUsers(){
    this.router.navigate(['/sub-departments']);
  }
}
