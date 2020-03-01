import { Component } from '@angular/core';
import { MainDeptEmployee } from '../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../service/main-dept-employee.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-main-dept-employee',
  templateUrl: './create-main-dept-employee.component.html',
  styleUrls: ['./create-main-dept-employee.component.css']
})
export class CreateMainDeptEmployeeComponent{

  mainDeptEmployee: MainDeptEmployee;


  constructor(private mainDeptEmployeeService: MainDeptEmployeeService, private router: Router) {
    this.mainDeptEmployee = new MainDeptEmployee();
  }

  addMainDeptEmployee(){
    this.mainDeptEmployeeService.addMainDeptEmployee(this.mainDeptEmployee).subscribe(result => this.goToAllMainEmployees());
  }

  onSubmit(){
    this.addMainDeptEmployee();
  }

  goToAllMainEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }



}
