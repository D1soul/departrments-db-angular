import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../entities/user';
import {Role} from '../../entities/role';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  role: Role;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }
  getAllUsers() {
    this.authenticationService.getAllUsers()
      .subscribe(users => this.users = users);
  }

  makeUserAdmin(username: string, user: User){
    user.roles = [this.role.user, this.role.admin];
    this.authenticationService.updateUser(username, user);
  }

  deleteUser(username: string){
    this.authenticationService.deleteUser(username)
      .subscribe(data => {
        this.getAllUsers();
    });
  }
}
