import {Component, OnInit} from '@angular/core';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-sub-department',
  templateUrl: './create-sub-department.component.html',
  styleUrls: ['./create-sub-department.component.css']
})

export class CreateSubDepartmentComponent implements OnInit{

  subDepartment: SubDepartment;
  mainDepartments: MainDepartment[];

  constructor(private subDepartmentService: SubDepartmentService,
              private mainDepartmentService: MainDepartmentService, private router: Router) {
    this.subDepartment = new SubDepartment();
  }

  ngOnInit() {
    this.selectMainDepartment();
  }

  onSubmit(){
    this.addSubDepartment();
  }

  addSubDepartment(){
    this.subDepartmentService.addSubDepartment(this.subDepartment).subscribe(result => this.goToAllSubDepartments());
  }

  selectMainDepartment(){
    this.mainDepartmentService.getAllMainDepartments().subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
  }
}
