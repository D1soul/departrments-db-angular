import {Component, OnInit} from '@angular/core';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-sub-department',
  templateUrl: './create-sub-department.component.html',
  styleUrls: ['./create-sub-department.component.css']
})

export class CreateSubDepartmentComponent implements OnInit{

  subDepartment: SubDepartment;
  mainDepartments: MainDepartment[];
  sDeptCrForm: FormGroup;
  submitted: boolean = false;

  constructor(private subDepartmentService: SubDepartmentService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder, private router: Router) {
    this.subDepartment = new SubDepartment();
  }

  ngOnInit() {
    this.selectMainDepartment();
    this.initSubDeptForm();
  }

  selectMainDepartment(){
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  initSubDeptForm(){
    this.sDeptCrForm = this.formBuilder.group({
      "name": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\s?)+|([A-z]+\\s?)+)$"),
        Validators.minLength(5),
        Validators.maxLength(60)]],
      "mainDepartment": [null,[Validators.required]]
    });
  }

  addSubDepartment(){
    this.submitted = true;
    if (this.sDeptCrForm.valid) {
      this.subDepartmentService.addSubDepartment(this.subDepartment)
        .subscribe(result => this.goToAllSubDepartments());
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
  }
}
