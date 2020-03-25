import { Component, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { Router} from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-main-dept-employee',
  templateUrl: './create-main-dept-employee.component.html',
  styleUrls: ['./create-main-dept-employee.component.css']
})
export class CreateMainDeptEmployeeComponent implements OnInit{

  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];
  mEmpCrForm: FormGroup;
  submitted: boolean = false;

  constructor(private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService,
              private router: Router, private formBuilder: FormBuilder) {
    this.mainDeptEmployee = new MainDeptEmployee();
  }

  ngOnInit() {
    this.selectMainDepartment();
    this.initMainDeptEmpForm();
  }

  selectMainDepartment(){
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  initMainDeptEmpForm(){
    this.mEmpCrForm = this.formBuilder.group({
      "lastName": [null, [Validators.required,
                          Validators.pattern("^([А-я]+|[A-z]+)$"),
                          Validators.minLength(2),
                          Validators.maxLength(20)]],
      "firstName": [null, [Validators.required,
                           Validators.pattern("^([А-я]+|[A-z]+)$"),
                           Validators.minLength(2),
                           Validators.maxLength(20)]],
      "middleName": [null, [Validators.required,
                            Validators.pattern("^(([А-я]+|[A-z]+)|(-))$"),
                            Validators.minLength(1),
                            Validators.maxLength(25)]],
      "birthDate": [null, [Validators.required,
                           Validators.pattern("^\\d{2}/((января)|(февраля)"
                                             + "|(марта)|(апреля)|(мая)|(июня)|(июля)"
                                             + "|(августа)|(сентября)|(октября)"
                                             + "|(ноября)|(декабря))/\\d{4}$")]],
      "passport": [null, [Validators.required,
                          Validators.pattern("^(Серия:\\s?)\\d{2}\\s"
                                            + "\\d{2}\\s(Номер:\\s?)\\d{6}$")]],
      "mainDepartment": [null, [Validators.required]]
    });
  }

  addMainDeptEmployee(){
    this.submitted = true;
    if (this.mEmpCrForm.valid) {
      this.mainDeptEmployeeService.addMainDeptEmployee(this.mainDeptEmployee)
        .subscribe(result => this.goToAllMainEmployees());
    }
  }

  goToAllMainEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
