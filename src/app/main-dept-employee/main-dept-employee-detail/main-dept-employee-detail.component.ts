import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { MainDeptEmployee } from '../../entities/main-dept-employee';

@Component({
  selector: 'app-main-dept-employee-detail',
  templateUrl: './main-dept-employee-detail.component.html',
  styleUrls: ['./main-dept-employee-detail.component.css']
})
export class MainDeptEmployeeDetailComponent implements OnInit {

  lastName: string; firstName :string; middleName: string;
  mainDeptEmployee: MainDeptEmployee;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService) {}

  ngOnInit() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.getMainDeptEmployeeDetail();
  }

  getMainDeptEmployeeDetail() {
    this.mainDeptEmployeeService.getMainDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(mainDeptEmployee => this.mainDeptEmployee = mainDeptEmployee);
  }

  goToUpdateMainDeptEmployee(lastName: string, firstName: string, middleName: string) {
    this.router.navigate(['/update-main_dept_employee', lastName, firstName, middleName])
  }


}
