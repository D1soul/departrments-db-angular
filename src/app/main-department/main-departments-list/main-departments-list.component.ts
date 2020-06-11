import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-main-departments-list',
  templateUrl: './main-departments-list.component.html',
  styleUrls: ['./main-departments-list.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }
})
export class MainDepartmentsListComponent implements OnInit, OnDestroy {

  mainDepartments: MainDepartment[];
  isAdmin: boolean;

  constructor(private mainDepartmentService: MainDepartmentService, private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.getAllMainDepartments();
  }

  getAllMainDepartments() {
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  deleteMainDepartment(name: string){
    this.mainDepartmentService.deleteMainDepartment(name)
      .subscribe(() => {
    this.getAllMainDepartments();
    });
  }

  goToAddMainDepartment(){
    this.router.navigate(['add-main_department']).then();
  }

  ngOnDestroy(): void {
  }

}
