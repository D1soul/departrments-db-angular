import { Component, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';

@Component({
  selector: 'app-update-sub-dept-employee',
  templateUrl: './update-sub-dept-employee.component.html',
  styleUrls: ['./update-sub-dept-employee.component.css']
})
export class UpdateSubDeptEmployeeComponent implements OnInit {

  lastName: string;
  firstName: string;
  middleName: string;
  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];

  constructor(private route: ActivatedRoute, private router: Router,
              private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService) {}

  ngOnInit() {
    this.getSubDeptEmployeeDetail();
  }

  getSubDeptEmployeeDetail() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.subDeptEmployeeService.getSubDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(subDeptEmployee => this.subDeptEmployee = subDeptEmployee);
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  updateSubDeptEmployee(){
    this.subDeptEmployeeService.updateSubDeptEmployee(
      this.lastName, this.firstName, this.middleName, this.subDeptEmployee)
      .subscribe(() =>  this.goToAllSubDeptEmployees());
  }

  goToAllSubDeptEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
