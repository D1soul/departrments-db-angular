import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../entities/user';
import { Role } from '../../entities/role';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }
})
export class UserListComponent implements OnInit {

  users: User[];
  role: Role;

  constructor(private authenticationService: AuthenticationService) {
    this.role = new Role();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authenticationService.getAllUsers()
      .subscribe(users => {
        this.users = users;
    });
  }

  banAccount(username: string, user: User){
    user.isBanned = !user.isBanned;
    this.authenticationService.updateUser(username, user).subscribe();
    return;
  }

  makeUserAdmin(username: string, user: User){
    user.roles = [this.role.user, this.role.admin];
    this.authenticationService.updateUser(username, user).subscribe();
    return;
  }

}
