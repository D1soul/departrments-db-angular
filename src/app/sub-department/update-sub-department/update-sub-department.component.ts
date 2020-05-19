import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-sub-department',
  templateUrl: './update-sub-department.component.html',
  styleUrls: ['./update-sub-department.component.css']
})
export class UpdateSubDepartmentComponent implements OnInit {

  name: string;
  subDepartment: SubDepartment;
  mainDepartments: MainDepartment[];
  sDeptUpdForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private subDepartmentService: SubDepartmentService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getSubDepartmentDetail();
    this.initSubDeptForm()
  }

  getSubDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
    this.subDepartmentService.getSubDepartmentDetail(this.name)
      .subscribe(subDepartment => this.subDepartment = subDepartment);
  }

  initSubDeptForm(){
    this.sDeptUpdForm = this.formBuilder.group({
      "name": [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\s?)+|([A-z]+\\s?)+)$"),
        Validators.minLength(5),
        Validators.maxLength(60)]],
      "mainDepartment": [null,[Validators.required]]
    });
  }

  updateSubDepartment(){
    if (this.sDeptUpdForm.valid){
    this.subDepartmentService.updateSubDepartment(this.name, this.subDepartment)
      .subscribe(() =>  this.goToAllSubDepartments());
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
  }
}
