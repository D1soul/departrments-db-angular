import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-main-dept-employee-list',
  templateUrl: './main-dept-employee-list.component.html',
  styleUrls: ['./main-dept-employee-list.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }
})

export class MainDeptEmployeeListComponent implements OnInit {

  mainDeptEmployees: MainDeptEmployee[];
  isAdmin: boolean;

  constructor(private mainDeptEmployeeService: MainDeptEmployeeService, private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.getAllMainDeptEmployees();
  }

  getAllMainDeptEmployees() {
    this.mainDeptEmployeeService.getAllMainDeptEmployees()
      .subscribe(mainDeptEmployees => this.mainDeptEmployees = mainDeptEmployees);
  }

  deleteMainDeptEmployee(lastName: string, firstName: string, middleName: string){
    this.mainDeptEmployeeService.deleteMainDeptEmployee(lastName, firstName, middleName)
      .subscribe(() => {
    this.getAllMainDeptEmployees();
    });
  }

  goToAddMainDeptEmployee(){
    this.router.navigate(['add-main_dept_employee']).then();
  }
}
