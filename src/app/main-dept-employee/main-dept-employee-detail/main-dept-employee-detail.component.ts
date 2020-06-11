import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-main-dept-employee-detail',
  templateUrl: './main-dept-employee-detail.component.html',
  styleUrls: ['./main-dept-employee-detail.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class MainDeptEmployeeDetailComponent implements OnInit {

  lastName: string; firstName :string; middleName: string;
  mainDeptEmployee: MainDeptEmployee;
  isAdmin: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.getMainDeptEmployeeDetail();
  }

  getMainDeptEmployeeDetail() {
    this.mainDeptEmployeeService.getMainDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(mainDeptEmployee => this.mainDeptEmployee = mainDeptEmployee,
        error => { this.errorMessage = error;
      });
  }

  goToUpdateMainDeptEmployee(lastName: string, firstName: string, middleName: string) {
    this.router.navigate(['/update-main_dept_employee', lastName, firstName, middleName]).then();
  }


}
