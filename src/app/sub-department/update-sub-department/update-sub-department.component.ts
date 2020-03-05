import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';

@Component({
  selector: 'app-update-sub-department',
  templateUrl: './update-sub-department.component.html',
  styleUrls: ['./update-sub-department.component.css']
})
export class UpdateSubDepartmentComponent implements OnInit {

  name: string;
  subDepartment: SubDepartment;
  mainDepartments: MainDepartment[];

  constructor(private route: ActivatedRoute, private router: Router,
              private subDepartmentService: SubDepartmentService,
              private mainDepartmentService: MainDepartmentService) {}

  ngOnInit() {
    this.getSubDepartmentDetail();
  }

  getSubDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.subDepartmentService.getSubDepartmentDetail(this.name)
      .subscribe(subDepartment => this.subDepartment = subDepartment);
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  updateSubDepartment(){
    this.subDepartmentService.updateSubDepartment(this.name, this.subDepartment)
      .subscribe(() =>  this.goToAllSubDepartments());
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
  }
}
