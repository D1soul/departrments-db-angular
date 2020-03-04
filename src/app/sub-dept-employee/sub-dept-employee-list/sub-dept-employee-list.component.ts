import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';

@Component({
  selector: 'app-sub-dept-employee-list',
  templateUrl: './sub-dept-employee-list.component.html',
  styleUrls: ['./sub-dept-employee-list.component.css']
})
export class SubDeptEmployeeListComponent implements OnInit {

  subDeptEmployees: SubDeptEmployee[];

  constructor(private subDeptEmployeeService: SubDeptEmployeeService, private router: Router) {}

  ngOnInit() {
    this.getAllSubDeptEmployees();
  }

  getAllSubDeptEmployees() {
    this.subDeptEmployeeService.getAllSubDeptEmployees().subscribe(subDeptEmployees => this.subDeptEmployees = subDeptEmployees);
  }

  goToAddSubDeptEmployee(){
    this.router.navigate(['add-sub-dept_employee']);
  }
}
