import {
  AfterViewInit,
  Component,
  ContentChild, ContentChildren,
  Directive,
  DoCheck,
  ElementRef,
  Host,
  HostListener,
  OnInit, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { Router} from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SetBirthDate} from '../../service/set.bitrh.date';
import {InitBirthDate} from '../../service/init.birth.date';
import {SetPassport} from '../../service/set.passport';
import {trigger} from '@angular/animations';
import {OnFocusControl} from '../../service/on.focus.control';

@Component({
  selector: 'app-create-sub-dept-employee',
  templateUrl: './create-sub-dept-employee.component.html',
  styleUrls: ['./create-sub-dept-employee.component.css'],
  animations: [
    trigger('validationStatus', [])
  ]
})
export class CreateSubDeptEmployeeComponent implements OnInit  {


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

//  @ViewChildren(OnFocusControl) directive: QueryList<OnFocusControl>;
  @ViewChildren(OnFocusControl) inputs:  QueryList<OnFocusControl>;

 @ViewChild(OnFocusControl, {static:false})
   directive: OnFocusControl;

  @ViewChildren(OnFocusControl) ef: QueryList<ElementRef>;



//  get direct(){
  //  return this.directive;
//  }

//  @ViewChildren('formControlName')ef: ElementRef;


  @HostListener('click')
  OnClick(){
    let elements =[];

  //      this.ef.forEach( fn => {
    //          elements.push(fn)
  //      } );

    //this.ef.forEach(fn => elements = fn);
  //  for (let el  in elements){

    this.inputs.forEach(fn => elements.push(fn));
      console.log(this.inputs);
//    }


//  let directive: OnFocusControl;

//    console.log(directive.print());
 //   console.log(this.directive.first.registerOnTouched(''));
//    console.log(this.directive.OnClick());


 //   console.log(this.onFocusControl.print());

  }

  ngOnInit() {
    InitBirthDate(this.days, this.months, this.years);
    this.initSubDeptEmpForm();
    this.selectSubDepartment();
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

  addSubDeptEmployee(){
    this.submitted = true;
    this.subDeptEmployee.passport = SetPassport(this.sEmpCrForm, 'seriesF', 'seriesS', 'number');
    this.subDeptEmployee.birthDate = SetBirthDate(this.sEmpCrForm, 'day', 'month', 'year');
    if(this.sEmpCrForm.valid) {
      this.subDeptEmployeeService.addSubDeptEmployee(this.subDeptEmployee)
        .subscribe(() => this.goToAllSubEmployees());
    }
  }

  goToAllSubEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }


}
