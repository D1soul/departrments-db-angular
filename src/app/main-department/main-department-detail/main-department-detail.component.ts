import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';

@Component({
  selector: 'app-main-department-detail',
  templateUrl: './main-department-detail.component.html',
  styleUrls: ['./main-department-detail.component.css']
})
export class MainDepartmentDetailComponent implements OnInit {

  name: string;
  mainDepartment: MainDepartment;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDepartmentService: MainDepartmentService) {}

  ngOnInit() {
    this.getMainDepartmentDetail();
  }

  getMainDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.mainDepartmentService.getMainDepartmentDetail(this.name)
      .subscribe(mainDepartment => this.mainDepartment = mainDepartment);
  }

  goToUpdateMainDepartment (name: string) {
    this.router.navigate(['/update-main_department/', name])
  }
}
