import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {Role} from '../../entities/role';
import { PasswordMatchValidator } from '../../service/password.match.validator';
import {InitBirthDate} from '../../service/init.birth.date';
import {SetBirthDate} from '../../service/set.bitrh.date';

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
  submitted: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
    this.role = new Role();
  }
  ngOnInit(): void {

  //  this.user.roles.push(this.userRole);

    InitBirthDate(this.days, this.months, this.years);
    this.initRegUserForm();
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

  register(){
    this.submitted = true;
    this.user.birthDate = SetBirthDate(this.regForm, 'day', 'month', 'year');
    this.user.roles = [this.role.user];
        if (this.regForm.valid) {
          this.authenticationService.registration(this.user)
        .subscribe(() => this.goToAllUsers());
    }
  }

  goToAllUsers(){
    this.router.navigate(['/user_detail/', this.user.username]);
  }
}





