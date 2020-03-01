import { Component, OnInit } from '@angular/core';
import {MainDeptEmployee} from '../entities/main-dept-employee';
import {ActivatedRoute, Router} from '@angular/router';
import {MainDeptEmployeeService} from '../service/main-dept-employee.service';

@Component({
  selector: 'app-update-main-dept-employee',
  templateUrl: './update-main-dept-employee.component.html',
  styleUrls: ['./update-main-dept-employee.component.css']
})
export class UpdateMainDeptEmployeeComponent implements OnInit {

  id: number;
  mainDeptEmployee: MainDeptEmployee;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService) {}

  ngOnInit(): void {
    this.getMainDeptEmployeeDetails();
  }

  getMainDeptEmployeeDetails() {
    this.id = this.route.snapshot.params['id'];
    this.mainDeptEmployeeService.getMainDeptEmployeeDetails(this.id)
      .subscribe(mainEmployee => this.mainDeptEmployee = mainEmployee);
  }

  updateMainDeptEmployee(){
    this.mainDeptEmployeeService.updateMainDeptEmployee(this.id, this.mainDeptEmployee)
      .subscribe(() =>  this.goToAllMainDeptEmployees());
  }

  goToAllMainDeptEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
