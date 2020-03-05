import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';

@Component({
  selector: 'app-sub-departments-list',
  templateUrl: './sub-departments-list.component.html',
  styleUrls: ['./sub-departments-list.component.css']
})
export class SubDepartmentsListComponent implements OnInit {

  subDepartments: SubDepartment[];

  constructor(private subDepartmentService: SubDepartmentService, private router: Router) {}

  ngOnInit() {
    this.getAllSubDepartments();
  }

  getAllSubDepartments() {
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  deleteSubDepartment(name: string){
    this.subDepartmentService.deleteSubDepartment(name).subscribe(data => {
      console.log(data);
      this.getAllSubDepartments();
    });
  }

  goToAddSubDepartment(){
    this.router.navigate(['add-sub-department']);
  }

}
