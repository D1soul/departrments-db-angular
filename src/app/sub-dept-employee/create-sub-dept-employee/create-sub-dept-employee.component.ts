import { Component, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { Router} from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-sub-dept-employee',
  templateUrl: './create-sub-dept-employee.component.html',
  styleUrls: ['./create-sub-dept-employee.component.css']
})
export class CreateSubDeptEmployeeComponent implements OnInit {

  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];
  sEmpCrForm: FormGroup;
  submitted: boolean = false;

  constructor(private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder, private router: Router) {
    this.subDeptEmployee = new SubDeptEmployee();
  }

  ngOnInit() {
    this.initSubDeptEmpForm();
    this.selectSubDepartment();
  }

  selectSubDepartment(){
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  initSubDeptEmpForm(){
    this.sEmpCrForm = this.formBuilder.group({
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

  addSubDeptEmployee(){
    this.submitted = true;
    if(this.sEmpCrForm.valid) {
      this.subDeptEmployeeService.addSubDeptEmployee(this.subDeptEmployee)
        .subscribe(result => this.goToAllSubEmployees());
    }
  }

  goToAllSubEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
