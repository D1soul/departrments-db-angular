import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../entities/role';
import { fadeInAndOutBottomAndTopAnimation } from '../../animation/fade-in-and-out-bottom-and-top-animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAndOutBottomAndTopAnimation],
  host: { '[@fadeInAndOutBottomAndTopAnimation]': '' }
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  inputName: string = '';
  changePasswordType: boolean = false;
  role: Role;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private elementRef: ElementRef) {
    this.role = new Role();
  }

  ngOnInit() {
    this.createLoginForm();
    this.getLoginFocusedElementName();
    this.getLoginFormValue();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required]
    });
  }

  getLoginFocusedElementName(){
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

  getLoginFormValue(){
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  authorize(){
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.username, this.password).subscribe( user => {
          if (user && user.roles.includes(this.role.admin)){
            this.goToUsers()
          }
          else {
            this.goToDepartments();
          }
      }, error => {
          this.errorMessage = error;
        });
    }
  }

  goToUsers(){
    this.router.navigate(['users']).then();
  }

  goToDepartments(){
    this.router.navigate(['main_departments']).then();
  }
}
