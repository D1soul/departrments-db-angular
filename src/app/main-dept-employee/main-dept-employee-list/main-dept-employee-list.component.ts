import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';

@Component({
  selector: 'app-main-dept-employee-list',
  templateUrl: './main-dept-employee-list.component.html',
  styleUrls: ['./main-dept-employee-list.component.css']
})
export class MainDeptEmployeeListComponent implements OnInit {

  mainDeptEmployees: MainDeptEmployee[];

  constructor(private mainDeptEmployeeService: MainDeptEmployeeService, private router: Router) {}

  ngOnInit() {
    this.getAllMainDeptEmployees();
  }

  getAllMainDeptEmployees() {
    this.mainDeptEmployeeService.getAllMainDeptEmployees()
      .subscribe(mainDeptEmployees => this.mainDeptEmployees = mainDeptEmployees);
  }

  deleteMainDeptEmployee(lastName: string, firstName: string, middleName: string){
    this.mainDeptEmployeeService.deleteMainDeptEmployee(lastName, firstName, middleName)
      .subscribe(data => { console.log(data);
      this.getAllMainDeptEmployees();
    });
  }

  goToAddMainDeptEmployee(){
    this.router.navigate(['add-main_dept_employee']);
  }
}
