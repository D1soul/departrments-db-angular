import { Component, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';

@Component({
  selector: 'app-update-main-dept-employee',
  templateUrl: './update-main-dept-employee.component.html',
  styleUrls: ['./update-main-dept-employee.component.css']
})
export class UpdateMainDeptEmployeeComponent implements OnInit {

  lastName: string;
  firstName: string;
  middleName: string;
  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService) {}

  ngOnInit() {
    this.getMainDeptEmployeeDetail();
  }

  getMainDeptEmployeeDetail() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.mainDeptEmployeeService.getMainDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(mainDeptEmployee => this.mainDeptEmployee = mainDeptEmployee);
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  updateMainDeptEmployee(){
    this.mainDeptEmployeeService.updateMainDeptEmployee(
      this.lastName, this.firstName, this.middleName, this.mainDeptEmployee)
      .subscribe(() =>  this.goToAllMainDeptEmployees());
  }

  goToAllMainDeptEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
