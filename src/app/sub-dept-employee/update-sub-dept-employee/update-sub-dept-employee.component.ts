import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {InitBirthDate} from '../../service/init.birth.date';

@Component({
  selector: 'app-update-sub-dept-employee',
  templateUrl: './update-sub-dept-employee.component.html',
  styleUrls: ['./update-sub-dept-employee.component.css']
})
export class UpdateSubDeptEmployeeComponent implements OnInit, AfterViewInit {

  lastNameRoute: string;
  firstNameRote: string;
  middleNameRote: string;
  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];
  sEmpUpdForm: FormGroup;
  days = [];
  months = [];
  years = [];
  inputName: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.createSubDeptEmpForm();
    this.getSubDeptEmployeeDetail();
    InitBirthDate(this.days, this.months, this.years);
    //
    this.getCrSDEFocusedElementName();
  }

  ngAfterViewInit(): void {
    this.getSubDeptEmplFormValue(this.subDeptEmployee);
  }

  getSubDeptEmployeeDetail() {
    this.lastNameRoute = this.route.snapshot.params['lastName'];
    this.firstNameRote = this.route.snapshot.params['firstName'];
    this.middleNameRote = this.route.snapshot.params['middleName'];
    this.subDeptEmployeeService.getSubDeptEmployeeDetail(
      this.lastNameRoute, this.firstNameRote, this.middleNameRote)
      .subscribe(subDeptEmployee => {
        this.initSubDeptEmplForm(subDeptEmployee);
        this.subDeptEmployee = subDeptEmployee;
      //  this.getSubDeptEmplFormValue(subDeptEmployee);
    });
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments =>
        this.subDepartments = subDepartments);
  }

  createSubDeptEmpForm(){
    this.sEmpUpdForm = this.formBuilder.group({
      lastName: [null, [Validators.required,
                        Validators.pattern("^([А-я]+|[A-z]+)$")]],
      firstName: [null, [Validators.required,
                         Validators.pattern("^([А-я]+|[A-z]+)$")]],
      middleName: [null, [Validators.required,
                          Validators.pattern("^(([А-я]+|[A-z]+)|(-))$")]],
      day: [null, [Validators.required]],
      month: [null, [Validators.required]],
      year: [null, [Validators.required]],
      seriesF:[null, [Validators.required,
                      Validators.pattern("\\d{2}")]],
      seriesS:[null, [Validators.required,
                      Validators.pattern("\\d{2}")]],
      number:[null, [Validators.required,
                     Validators.pattern("\\d{6}")]],
      subDepartment: [null, [Validators.required]]
    });
  }

  initSubDeptEmplForm(subDeptEmployee: SubDeptEmployee){
    let birthDateValue = subDeptEmployee.birthDate.split('/');
    let passportValue = subDeptEmployee.passport.split(' ');
    this.sEmpUpdForm.setValue({
      lastName: subDeptEmployee.lastName,
      firstName: subDeptEmployee.firstName,
      middleName: subDeptEmployee.middleName,
      day: birthDateValue[0],
      month: birthDateValue[1],
      year: birthDateValue[2],
      seriesF: passportValue[1],
      seriesS: passportValue[2],
      number: passportValue[4],
      subDepartment: subDeptEmployee.subDepartment
    });
  }

  getSubDeptEmplFormValue(subDeptEmployee){
    this.sEmpUpdForm.valueChanges.subscribe((formData) =>{
      subDeptEmployee.lastName = formData.lastName;
      subDeptEmployee.firstName = formData.firstName;
      subDeptEmployee.middleName = formData.middleName;
      subDeptEmployee.birthDate = formData.day + '/'
                                + formData.month + '/'
                                + formData.year;
      subDeptEmployee.passport = 'Серия: ' + formData.seriesF
                               + ' ' + formData.seriesS
                               + ' Номер: ' + formData.number;
      subDeptEmployee.subDepartment = formData.subDepartment;
    });
  }

  getCrSDEFocusedElementName(){
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


  updateSubDeptEmployee(){
    if (this.sEmpUpdForm.valid) {
      this.subDeptEmployeeService.updateSubDeptEmployee(
        this.lastNameRoute, this.firstNameRote, this.middleNameRote, this.subDeptEmployee)
        .subscribe(() => this.goToAllSubDeptEmployees());
    }
  }

  goToAllSubDeptEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
