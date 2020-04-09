import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  username: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: string;
  roles: Array<string>;

  constructor(private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
  }

  getUserDetail() {
    this.authenticationService.getUserDetails(this.username)
      .subscribe(user => this.user = user);
  }

  goToUpdateUser(username: string) {
    this.router.navigate(['/update-user', username])
  }

}
