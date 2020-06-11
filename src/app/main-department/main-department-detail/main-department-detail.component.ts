import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-main-department-detail',
  templateUrl: './main-department-detail.component.html',
  styleUrls: ['./main-department-detail.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class MainDepartmentDetailComponent implements OnInit {

  name: string;
  mainDepartment: MainDepartment;
  isAdmin: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDepartmentService: MainDepartmentService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.getMainDepartmentDetail();
  }

  getMainDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.mainDepartmentService.getMainDepartmentDetail(this.name)
      .subscribe(mainDepartment => this.mainDepartment = mainDepartment,
        error => { this.errorMessage = error;
      });
  }

  goToUpdateMainDepartment (name: string) {
    this.router.navigate(['/update-main_department/', name]).then();
  }
}
