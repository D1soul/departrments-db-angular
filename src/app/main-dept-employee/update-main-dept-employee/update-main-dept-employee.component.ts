import {Component, ElementRef, OnInit} from '@angular/core';
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
  days = [];
  months = [];
  years = [];
  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];
  mEmpUpdForm: FormGroup;
  inputName: string = '';
  submitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.getMainDeptEmployeeDetail();
    this.createMainDeptEmpForm();
    this.getMainDeptEmpFormValue(this.mainDeptEmployee);
    this.getUpdMDEFocusedElementName();
  }

  getMainDeptEmployeeDetail() {
    this.lastName = this.route.snapshot.params['lastName'];
    this.firstName = this.route.snapshot.params['firstName'];
    this.middleName = this.route.snapshot.params['middleName'];
    this.mainDeptEmployeeService.getMainDeptEmployeeDetail(
      this.lastName, this.firstName, this.middleName)
      .subscribe(mainDeptEmployee => {
        this.mainDeptEmployee = mainDeptEmployee;
        this.initMainDeptEmpForm(mainDeptEmployee);
    });
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments =>
        this.mainDepartments = mainDepartments
    );
  }

  createMainDeptEmpForm(){
    this.mEmpUpdForm = this.formBuilder.group({
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
      seriesF:[null, [Validators.required,
                      Validators.pattern("\\d{2}")]],
      seriesS:[null, [Validators.required,
                      Validators.pattern("\\d{2}")]],
      number:[null, [Validators.required,
                     Validators.pattern("\\d{6}")]],
      mainDepartment: [null, [Validators.required]]
    });
  }

  initMainDeptEmpForm(mainDeptEmployee){
    let birthDateValue = mainDeptEmployee.birthDate.split('/');
    let passportValue = mainDeptEmployee.passport.split(' ');
    this.mEmpUpdForm.setValue({
      lastName: mainDeptEmployee.lastName,
      firstName: mainDeptEmployee.firstName,
      middleName: mainDeptEmployee.middleName,
      day: birthDateValue[0],
      month: birthDateValue[1],
      year: birthDateValue[2],
      seriesF: passportValue[1],
      seriesS: passportValue[2],
      number: passportValue[4],
      mainDepartment: mainDeptEmployee.mainDepartment
    });
  }

  getMainDeptEmpFormValue(mainDeptEmployee){
    this.mEmpUpdForm.valueChanges.subscribe(formData =>{
      mainDeptEmployee.lastName = formData.lastName;
      mainDeptEmployee.firstName = formData.firstName;
      mainDeptEmployee.middleName = formData.middleName;
      mainDeptEmployee.birthDate = formData.day + '/'
                                 + formData.month + '/'
                                 + formData.year;
      mainDeptEmployee.passport = 'Серия: ' + formData.seriesF
                                + ' ' + formData.seriesS
                                + ' Номер: ' + formData.number;
      mainDeptEmployee.mainDepartment = formData.mainDepartment;
    });
  }

  getUpdMDEFocusedElementName() {
    let elements = [].slice.call((this.elementRef.nativeElement)
      .querySelectorAll('[formControlName]'));
    elements.forEach(element => {
      element.addEventListener('focus', () => {
        this.inputName = element.id;
      });
      element.addEventListener('blur', () => {
        this.inputName = '';
      })
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
