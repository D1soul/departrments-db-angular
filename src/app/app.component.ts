import { Component } from '@angular/core';
import {AuthenticationService} from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Departments';

  constructor(private authenticationService: AuthenticationService ) {
  }


 // token: string = this.authenticationService.getJwtToken();

  token: string = localStorage.getItem('token');


}
