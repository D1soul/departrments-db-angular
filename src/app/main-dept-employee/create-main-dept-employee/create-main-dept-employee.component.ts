import { Component, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { Router} from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';

@Component({
  selector: 'app-create-main-dept-employee',
  templateUrl: './create-main-dept-employee.component.html',
  styleUrls: ['./create-main-dept-employee.component.css']
})
export class CreateMainDeptEmployeeComponent implements OnInit{

  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];

  constructor(private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService, private router: Router) {
    this.mainDeptEmployee = new MainDeptEmployee();
  }

  ngOnInit() {
    this.selectMainDepartment();
  }

  onSubmit(){
    this.addMainDeptEmployee();
  }

  addMainDeptEmployee(){
    this.mainDeptEmployeeService.addMainDeptEmployee(this.mainDeptEmployee).subscribe(result => this.goToAllMainEmployees());
  }

  selectMainDepartment(){
    this.mainDepartmentService.getAllMainDepartments().subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  goToAllMainEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
