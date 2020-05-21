import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';

@Component({
  selector: 'app-main-departments-list',
  templateUrl: './main-departments-list.component.html',
  styleUrls: ['./main-departments-list.component.css']
})
export class MainDepartmentsListComponent implements OnInit {

  mainDepartments: MainDepartment[];

  constructor(private mainDepartmentService: MainDepartmentService, private router: Router) {}

  ngOnInit() {
    this.getAllMainDepartments();
  }

  getAllMainDepartments() {
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  deleteMainDepartment(name: string){
    this.mainDepartmentService.deleteMainDepartment(name)
      .subscribe(data => {
    this.getAllMainDepartments();
    });
  }

  goToAddMainDepartment(){
    this.router.navigate(['add-main_department']);
  }

}
