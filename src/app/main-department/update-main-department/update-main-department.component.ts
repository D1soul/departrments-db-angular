import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-main-department',
  templateUrl: './update-main-department.component.html',
  styleUrls: ['./update-main-department.component.css']
})
export class UpdateMainDepartmentComponent implements OnInit {

  name: string;
  mainDepartment: MainDepartment;
  mDeptUpdForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getMainDepartmentDetail();
    this.initMainDeptForm()
  }

  getMainDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.mainDepartmentService.getMainDepartmentDetail(this.name)
      .subscribe(mainDepartment => this.mainDepartment = mainDepartment);
  }

  initMainDeptForm(){
    this.mDeptUpdForm = this.formBuilder.group({
      "name": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\s?)+|([A-z]+\\s?)+)$"),
        Validators.minLength(7),
        Validators.maxLength(60)]]
    });
  }

  updateMainDepartment(){
    if (this.mDeptUpdForm.valid) {
      this.mainDepartmentService.updateMainDepartment(this.name, this.mainDepartment)
        .subscribe(() => this.goToAllMainDepartments());
    }
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']);
  }
}
