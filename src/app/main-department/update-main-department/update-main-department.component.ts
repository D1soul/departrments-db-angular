import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';


@Component({
  selector: 'app-update-main-department',
  templateUrl: './update-main-department.component.html',
  styleUrls: ['./update-main-department.component.css']
})
export class UpdateMainDepartmentComponent implements OnInit {

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

  updateMainDepartment(){
    this.mainDepartmentService.updateMainDepartment(this.name, this.mainDepartment)
      .subscribe(() =>  this.goToAllMainDepartments());
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']);
  }
}
