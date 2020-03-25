import { Component, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-main-dept-employee',
  templateUrl: './update-main-dept-employee.component.html',
  styleUrls: ['./update-main-dept-employee.component.css']
})
export class UpdateMainDeptEmployeeComponent implements OnInit {

  lastName: string;
  firstName: string;
  middleName: string;
  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];
  mEmpUpdForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getMainDeptEmployeeDetail();
    this.initMainDeptEmpForm();
  }

  getMainDeptEmployeeDetail() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.mainDeptEmployeeService.getMainDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(mainDeptEmployee => this.mainDeptEmployee = mainDeptEmployee);
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  initMainDeptEmpForm(){
    this.mEmpUpdForm = this.formBuilder.group({
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

  updateMainDeptEmployee(){
    if (this.mEmpUpdForm.valid) {
      this.mainDeptEmployeeService.updateMainDeptEmployee(
        this.lastName, this.firstName, this.middleName, this.mainDeptEmployee)
        .subscribe(() => this.goToAllMainDeptEmployees());
    }
  }

  goToAllMainDeptEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
