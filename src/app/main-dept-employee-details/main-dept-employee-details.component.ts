import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MainDeptEmployeeService } from '../service/main-dept-employee.service';
import { MainDeptEmployee } from '../entities/main-dept-employee';

@Component({
  selector: 'app-main-dept-employee-details',
  templateUrl: './main-dept-employee-details.component.html',
  styleUrls: ['./main-dept-employee-details.component.css']
})
export class MainDeptEmployeeDetailsComponent implements OnInit{

  id: number;
  mainDeptEmployee: MainDeptEmployee;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService,) {}

  ngOnInit(): void {
    this.getMainDeptEmployeeDetails();
  }

  getMainDeptEmployeeDetails() {
    this.id = this.route.snapshot.params['id'];
    this.mainDeptEmployeeService.getMainDeptEmployeeDetails(this.id)
      .subscribe(mainDeptEmployee => this.mainDeptEmployee = mainDeptEmployee);
  }


  goToUpdateMainDeptEmployee(id: number) {
    this.router.navigate(['/update-main_dept_employee', id])
  }


}
