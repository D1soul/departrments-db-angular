import { Component, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { Router} from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';

@Component({
  selector: 'app-create-sub-dept-employee',
  templateUrl: './create-sub-dept-employee.component.html',
  styleUrls: ['./create-sub-dept-employee.component.css']
})
export class CreateSubDeptEmployeeComponent implements OnInit {

  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];

  constructor(private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService, private router: Router) {
    this.subDeptEmployee = new SubDeptEmployee();
  }

  ngOnInit() {
    this.selectSubDepartment();
  }

  onSubmit(){
    this.addSubDeptEmployee();
  }

  addSubDeptEmployee(){
    this.subDeptEmployeeService.addSubDeptEmployee(this.subDeptEmployee).subscribe(result => this.goToAllSubEmployees());
  }

  selectSubDepartment(){
    this.subDepartmentService.getAllSubDepartments().subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  goToAllSubEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
