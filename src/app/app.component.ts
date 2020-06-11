import { Component, DoCheck } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{

  isUserLogIn: boolean = false;
  isAdmin: boolean = false;
  username: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  logout(){
    this.authenticationService.logout();
  }

  ngDoCheck(): void {
    if (this.authenticationService.currentUserValue){
      this.isUserLogIn = true;
    }
    if (!this.authenticationService.currentUserValue){
      this.isUserLogIn = false;
    }

    if (this.isUserLogIn) {
      this.username = this.authenticationService.currentUserValue.username;
      if (this.authenticationService.isAdmin()) {
        this.isAdmin = true;
      }
    }
  }

}
