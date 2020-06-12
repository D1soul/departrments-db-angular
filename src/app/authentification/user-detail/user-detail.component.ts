import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../entities/user';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class UserDetailComponent implements OnInit {

  user: User = null;
  username: string = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.username = this.route.snapshot.params['username'];
      this.getUserDetail();
      this.isCurrentUser();
    });
  }

  isCurrentUser(): boolean{
    if (this.user) {
      let username = this.authenticationService.currentUserValue.username;
      return this.user.username === username;
    }
  }

  getUserDetail() {
    this.authenticationService.getUserDetails(this.username)
      .subscribe(user => {
         this.user = user;
         },
        error => this.errorMessage = error);
  }

  goToUpdateUser(username: string) {
    this.router.navigate(['/update_user', username]).then();
  }
}
