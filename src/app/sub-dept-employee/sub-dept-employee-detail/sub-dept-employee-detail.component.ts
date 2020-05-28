import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';

@Component({
  selector: 'app-sub-dept-employee-detail',
  templateUrl: './sub-dept-employee-detail.component.html',
  styleUrls: ['./sub-dept-employee-detail.component.css']
})
export class SubDeptEmployeeDetailComponent implements OnInit {

  lastName: string; firstName :string; middleName: string;
  subDeptEmployee: SubDeptEmployee;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private subDeptEmployeeService: SubDeptEmployeeService) {}

  ngOnInit() {
    this.getSubDeptEmployeeDetail();
  }

  getSubDeptEmployeeDetail() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.subDeptEmployeeService.getSubDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(subDeptEmployee => this.subDeptEmployee = subDeptEmployee,
        error => { this.errorMessage = error;
      });
  }

  goToUpdateSubDeptEmployee(lastName: string, firstName: string, middleName: string) {
    this.router.navigate(['/update-sub-dept_employee', lastName, firstName, middleName])
  }
}
