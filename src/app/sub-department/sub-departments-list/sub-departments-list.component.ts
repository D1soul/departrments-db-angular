import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { AuthenticationService } from '../../service/authentication.service';
import { fadeInAndOutLeftAnimation } from '../../animation/fade-in-and-out-left-animation';

@Component({
  selector: 'app-sub-departments-list',
  templateUrl: './sub-departments-list.component.html',
  styleUrls: ['./sub-departments-list.component.css'],
  animations: [fadeInAndOutLeftAnimation],
  host: { '[@fadeInAndOutLeftAnimation]': '' }
})
export class SubDepartmentsListComponent implements OnInit {

  subDepartments: SubDepartment[];
  isAdmin: boolean;

  constructor(private subDepartmentService: SubDepartmentService, private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
    this.getAllSubDepartments();
  }

  getAllSubDepartments() {
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  deleteSubDepartment(name: string){
    this.subDepartmentService.deleteSubDepartment(name).subscribe(() => {
      this.getAllSubDepartments();
    });
  }

  goToAddSubDepartment(){
    this.router.navigate(['add-sub-department']).then();
  }

}
