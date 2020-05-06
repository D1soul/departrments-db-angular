import { Component, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { Router} from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SetBirthDate} from '../../service/set.bitrh.date';
import {InitBirthDate} from '../../service/init.birth.date';

@Component({
  selector: 'app-create-sub-dept-employee',
  templateUrl: './create-sub-dept-employee.component.html',
  styleUrls: ['./create-sub-dept-employee.component.css']
})
export class CreateSubDeptEmployeeComponent implements OnInit {

  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];
  sEmpCrForm: FormGroup;
  days = [];
  months = [];
  years = [];
  submitted: boolean = false;

  constructor(private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder, private router: Router) {
    this.subDeptEmployee = new SubDeptEmployee();
  }

  ngOnInit() {
    InitBirthDate(this.days, this.months, this.years);
    this.initSubDeptEmpForm();
    this.selectSubDepartment();
  }

  selectSubDepartment(){
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  initSubDeptEmpForm(){
    this.sEmpCrForm = this.formBuilder.group({
      lastName: [null, [Validators.required,
                          Validators.pattern("^([А-я]+|[A-z]+)$"),
                          Validators.minLength(2),
                          Validators.maxLength(20)]],
      firstName: [null, [Validators.required,
                           Validators.pattern("^([А-я]+|[A-z]+)$"),
                           Validators.minLength(2),
                           Validators.maxLength(20)]],
      middleName: [null, [Validators.required,
                            Validators.pattern("^(([А-я]+|[A-z]+)|(-))$"),
                            Validators.minLength(1),
                            Validators.maxLength(25)]],
      day: [null, [Validators.required]],
      month: [null, [Validators.required]],
      year: [null, [Validators.required]],
    /*  passport: [null, [Validators.required,
                          Validators.pattern("^(Серия:\\s?)\\d{2}\\s"
                                            + "\\d{2}\\s(Номер:\\s?)\\d{6}$")]], */
      passportSF:[null],
      passportSS:[null],
      passportN:[null],
      subDepartment: [null,[Validators.required]]
    });
  }

  addSubDeptEmployee(){
    this.submitted = true;
    this.subDeptEmployee.birthDate = SetBirthDate(this.sEmpCrForm, 'day', 'month', 'year');
    if(this.sEmpCrForm.valid) {
      this.subDeptEmployeeService.addSubDeptEmployee(this.subDeptEmployee)
        .subscribe(result => this.goToAllSubEmployees());
    }
  }

  goToAllSubEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
