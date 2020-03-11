import { Component, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-sub-dept-employee',
  templateUrl: './update-sub-dept-employee.component.html',
  styleUrls: ['./update-sub-dept-employee.component.css']
})
export class UpdateSubDeptEmployeeComponent implements OnInit {

  lastName: string;
  firstName: string;
  middleName: string;
  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];
  sEmpUpdForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getSubDeptEmployeeDetail();
    this.initSubDeptEmpForm();
  }

  getSubDeptEmployeeDetail() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.subDeptEmployeeService.getSubDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(subDeptEmployee => this.subDeptEmployee = subDeptEmployee);
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  initSubDeptEmpForm(){
    this.sEmpUpdForm = this.formBuilder.group({
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
        Validators.maxLength(25)]],
      "birthDate": [null, [Validators.required,
        Validators.pattern("^\\d{2}/((января)|(февраля)"
          + "|(марта)|(апреля)|(мая)|(июня)|(июля)"
          + "|(августа)|(сентября)|(октября)"
          + "|(ноября)|(декабря))/\\d{4}$")]],
      "passport": [null,[Validators.required,
        Validators.pattern("^(Серия:\\s?)\\d{2}\\s\\d{2}"
          + "\\s(Номер:\\s?)\\d{6}$")]],
      "subDepartment": [null,[Validators.required]]
    });
  }

  updateSubDeptEmployee(){
    if (this.sEmpUpdForm.valid) {
      this.subDeptEmployeeService.updateSubDeptEmployee(
        this.lastName, this.firstName, this.middleName, this.subDeptEmployee)
        .subscribe(() => this.goToAllSubDeptEmployees());
    }
  }

  goToAllSubDeptEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
