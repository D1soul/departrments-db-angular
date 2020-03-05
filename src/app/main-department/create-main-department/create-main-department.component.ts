import { Component } from '@angular/core';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-main-department',
  templateUrl: './create-main-department.component.html',
  styleUrls: ['./create-main-department.component.css']
})
export class CreateMainDepartmentComponent {

  mainDepartment: MainDepartment;

  constructor(private mainDepartmentService: MainDepartmentService, private router: Router) {
    this.mainDepartment = new MainDepartment();
  }

  addMainDepartment(){
    this.mainDepartmentService.addMainDepartment(this.mainDepartment).subscribe(result => this.goToAllMainDepartments());
  }

  onSubmit(){
    this.addMainDepartment();
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']);
  }
}
