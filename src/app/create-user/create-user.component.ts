import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User;
  userCrForm: FormGroup;
  equalPassword: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  initUserForm(){
    this.userCrForm = this.formBuilder.group({
      "username": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\d*)+|([A-z]+\\d*)+)$"),
        Validators.minLength(1),
        Validators.maxLength(20)]],
      "password": [null, [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]],
      "confirmPassword": [null, [Validators.required, this.equalPassword,
        Validators.maxLength(25)]],
      "birthDate": [null, [Validators.required,
        Validators.pattern("^\\d{2}/((января)|(февраля)"
          + "|(марта)|(апреля)|(мая)|(июня)|(июля)"
          + "|(августа)|(сентября)|(октября)"
          + "|(ноября)|(декабря))/\\d{4}$")]],

      "gender": [null, [Validators.required,
        Validators.pattern("[male|female]")]]
      //"": [null, [Validators.required]]
    })
  }


  addUser(){
      this.authenticationService.addUser(this.user)
      .subscribe(result => this.goToAllUsers());
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    return password === confirmPassword ? null : { NotEquals: true }
  }

  goToAllUsers(){
    this.router.navigate(['/users']);
  }
}
