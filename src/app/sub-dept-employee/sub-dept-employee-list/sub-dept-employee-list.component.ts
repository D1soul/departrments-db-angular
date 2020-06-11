import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-sub-dept-employee-list',
  templateUrl: './sub-dept-employee-list.component.html',
  styleUrls: ['./sub-dept-employee-list.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }

})
export class SubDeptEmployeeListComponent implements OnInit {

  subDeptEmployees: SubDeptEmployee[];
  isAdmin: boolean;

  constructor(private subDeptEmployeeService: SubDeptEmployeeService, private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.getAllSubDeptEmployees();
  }

  getAllSubDeptEmployees() {
    this.subDeptEmployeeService.getAllSubDeptEmployees()
      .subscribe(subDeptEmployees => this.subDeptEmployees = subDeptEmployees);
  }

  deleteSubDeptEmployee(lastName: string, firstName: string, middleName: string){
    this.subDeptEmployeeService.deleteSubDeptEmployee(lastName, firstName, middleName)
      .subscribe(() => {
        this.getAllSubDeptEmployees();
      });
  }

  goToAddSubDeptEmployee(){
    this.router.navigate(['add-sub-dept_employee']).then();
  }
}
