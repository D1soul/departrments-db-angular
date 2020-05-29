import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  inputName: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.createLoginForm();
    this.getLoginFocusedElementName();
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

  authorize(){
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.username, this.password).subscribe(() => {

          this.goToAllSubDepartments();

      }, error => {
          this.errorMessage = error;
        });
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['main_departments']);
  }
}
