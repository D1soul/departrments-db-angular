import {AfterContentInit, Component, DoCheck, ElementRef, OnChanges, OnInit} from '@angular/core';
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
  submitted: boolean = true;
  changePassword: boolean = false;
  errorMessage: string;
  inputName: string = '';


  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private elementRef: ElementRef) {
      this.role = new Role();
  }

  ngOnInit() {
    InitDateFunction(this.days, this.months, this.years);
    this.getUserDetail();
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
      });
  }

  createUpdUserForms(){
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
    });
  }

  initUpdUserForms(user) {
    let birthDateValue = user.birthDate.split('/');
    this.updUserForm.setValue({
      username: user.username,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      day: birthDateValue[0],
      month: birthDateValue[1],
      year: birthDateValue[2],
      gender: user.gender,
      roles: user.roles
    });
  }


  getUpdUserFormValue(){
    this.updUserForm.valueChanges.subscribe((formData) => {
      let data = new Date(formData.year, this.months.indexOf(formData.month)+1, 0);
      if(formData.day > data.getDate() ) {
        this.updUserForm.get('day').setValue(data.getDate());
        return;
      }
      if (this.changePassword) {
        this.updUserForm.get('oldPassword').setValidators(Validators.required);
        this.updUserForm.get('newPassword').setValidators([Validators.required, Validators.minLength(6)]);
        this.updUserForm.get('confirmPassword').setValidators(Validators.required);
        this.updUserForm.setValidators(PasswordMatchValidator('newPassword', 'confirmPassword'));
        return;
      }
      setTimeout(() => {
        let regUser = this.user;
        regUser.username = formData.username;
        regUser.birthDate = formData.day + '/'
          + formData.month + '/'
          + formData.year;
        regUser.gender = formData.gender;
        regUser.roles = [this.role.user];
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


/*  initPasswordForm(){
    this.changePassword = true;
    this.updUserForm.get('password').setValidators(Validators.required);
    this.updUserForm.get('newPassword').setValidators([Validators.required, Validators.minLength(6)]);
    this.updUserForm.get('confirmPassword').setValidators(Validators.required);
    this.updUserForm.setValidators(PasswordMatchValidator('newPassword', 'confirmPassword'));
  }

 */

  setNewPassword(){
    let currentUsersName = this.authenticationService.currentUserValue.username;
    let oldPs: string = this.updUserForm.get('oldPassword').value;
    let newPs: string =  this.updUserForm.get('newPassword').value;
    let newConfirmPs: string = this.updUserForm.get('confirmPassword').value;
    this.updUserForm.get('password').clearValidators();
    this.updUserForm.get('newPassword').clearValidators();
    this.updUserForm.get('confirmPassword').clearValidators();
    this.authenticationService.changeOldPassword(
      currentUsersName, oldPs, newPs, newConfirmPs).subscribe((err) => {
        this.errorMessage = this.authenticationService.errorMessage;
        this.errorMessage = err;
        this.updUserForm.get('password').setErrors({'notFound': true});
    });
    this.changePassword = false;
  }

  updateUser(){
    this.user.roles = [this.role.admin];
    if (this.updUserForm.valid) {
      this.authenticationService.updateUser(this.username, this.user).subscribe();
    }
  }
}
