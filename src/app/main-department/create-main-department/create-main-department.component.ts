import {Component, OnInit} from '@angular/core';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-main-department',
  templateUrl: './create-main-department.component.html',
  styleUrls: ['./create-main-department.component.css']
})
export class CreateMainDepartmentComponent implements OnInit{

  mainDepartment: MainDepartment;
  mDeptCrForm: FormGroup;
  submitted: boolean = false;

  constructor(private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder, private router: Router) {
    this.mainDepartment = new MainDepartment();
  }

  ngOnInit() {
    this.initMainDeptForm();
  }

  initMainDeptForm(){
    this.mDeptCrForm = this.formBuilder.group({
      "name": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\s?)+|([A-z]+\\s?)+)$"),
        Validators.minLength(7),
        Validators.maxLength(60)]]
    });
  }

  addMainDepartment(){
    this.submitted = true;
    if (this.mDeptCrForm.valid) {
      this.mainDepartmentService.addMainDepartment(this.mainDepartment)
        .subscribe(result => this.goToAllMainDepartments());
    }
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']);
  }
}
