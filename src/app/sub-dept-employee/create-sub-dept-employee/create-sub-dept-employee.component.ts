import {AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SubDeptEmployee} from '../../entities/sub-dept-employee';
import {SubDeptEmployeeService} from '../../service/sub-dept-employee.service';
import {Router} from '@angular/router';
import {SubDepartment} from '../../entities/sub-department';
import {SubDepartmentService} from '../../service/sub-department.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SetBirthDate} from '../../service/set.bitrh.date';
import {InitBirthDate} from '../../service/init.birth.date';
import {SetPassport} from '../../service/set.passport';
import {trigger} from '@angular/animations';
import {OnFocusControl} from '../../service/on.focus.control';
import {GetElementOnFocus} from '../../service/get.element.on.focus';

@Component({
  selector: 'app-create-sub-dept-employee',
  templateUrl: './create-sub-dept-employee.component.html',
  styleUrls: ['./create-sub-dept-employee.component.css'],
  animations: [
    trigger('validationStatus', [])
  ]
})
export class CreateSubDeptEmployeeComponent implements OnInit {

  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];
  sEmpCrForm: FormGroup;
  days = [];
  months = [];
  years = [];
  submitted: boolean = false;
  inputName: string;

  constructor(private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder, private router: Router,  private elementRef: ElementRef ) {
    this.subDeptEmployee = new SubDeptEmployee();
  }

  @ViewChildren(OnFocusControl) inputs:  QueryList<OnFocusControl>;

  ngOnInit() {
    InitBirthDate(this.days, this.months, this.years);
    this.initSubDeptEmpForm();
    this.selectSubDepartment();
    this.getCrSDEFocusedElementName();
  }

  selectSubDepartment(){

    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments)
  }

  initSubDeptEmpForm(){
    this.sEmpCrForm = this.formBuilder.group({
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
      subDepartment: [null,[Validators.required]],
    });
  }

  getCrSDEFocusedElementName(){
    let elements = [].slice.call((this.elementRef.nativeElement).querySelectorAll('[formControlName]'));
    elements.forEach( element =>{
      element.addEventListener('focus', () => {
        this.inputName = element.id;
      });
      element.addEventListener('blur', () => {
        this.inputName = '';
      })
    });
  }

  addSubDeptEmployee(){
    this.submitted = true;
    this.subDeptEmployee.passport = SetPassport(this.sEmpCrForm, 'seriesF', 'seriesS', 'number');
    this.subDeptEmployee.birthDate = SetBirthDate(this.sEmpCrForm, 'day', 'month', 'year');
    if(this.sEmpCrForm.valid) {
      this.subDeptEmployeeService.addSubDeptEmployee(this.subDeptEmployee)
        .subscribe(() => this.goToAllSubEmployees());
        GetElementOnFocus(this.elementRef);
    }
  }

  goToAllSubEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }


}
