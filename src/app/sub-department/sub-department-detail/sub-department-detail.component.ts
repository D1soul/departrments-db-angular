import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-sub-department-detail',
  templateUrl: './sub-department-detail.component.html',
  styleUrls: ['./sub-department-detail.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class SubDepartmentDetailComponent implements OnInit {

  name: string;
  subDepartment: SubDepartment;
  isAdmin: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private subDepartmentService: SubDepartmentService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.getSubDepartmentDetail();
  }

  getSubDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.subDepartmentService.getSubDepartmentDetail(this.name)
      .subscribe(subDepartment => this.subDepartment = subDepartment,
        error => { this.errorMessage = error;
        });
  }

  goToUpdateSubDepartment (name: string) {
    this.router.navigate(['/update-sub-department', name]).then();
  }
}
