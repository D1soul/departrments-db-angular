import { Component, ElementRef, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { Router } from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitBirthDate } from '../../service/init.birth.date';
import { trigger } from '@angular/animations';
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
  data: Date;
  days = [];
  months = [];
  years = [];
  submitted: boolean = false;
  inputName: string = '';
  col: Array<any>;

  constructor(private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder, private router: Router,
              private elementRef: ElementRef ) {
    this.subDeptEmployee = new SubDeptEmployee();
  }

  ngOnInit() {
    this.initSubDeptEmpForm();
    InitBirthDate(this.days, this.months, this.years);
    this.selectSubDepartment();
    this.getSubDeptEmplFormValue(this.sEmpCrForm);
    this.getCrSDEFocusedElementName();
  }

  selectSubDepartment(){
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments => this.subDepartments = subDepartments);
  }

  initSubDeptEmpForm(){
    this.sEmpCrForm = this.formBuilder.group({
      lastName: [null, [Validators.required,
                        Validators.pattern("^([А-яЁё]+|[A-z]+)$")]],
      firstName: [null, [Validators.required,
                         Validators.pattern("^([А-яЁё]+|[A-z]+)$")]],
      middleName: [null, [Validators.required,
                          Validators.pattern("^(([А-яЁё]+|[A-z]+)|(-))$")]],
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

  getSubDeptEmplFormValue(form: FormGroup){
    form.valueChanges.subscribe((formData) => {
      setTimeout(() => {
        let subDeptEmpl = this.subDeptEmployee;
        subDeptEmpl.lastName = formData.lastName;
        subDeptEmpl.firstName = formData.firstName;
        subDeptEmpl.middleName = formData.middleName;
        subDeptEmpl.birthDate = formData.day + '/'
                              + formData.month + '/'
                              + formData.year;
        subDeptEmpl.passport = 'Серия: ' + formData.seriesF
                              + ' ' + formData.seriesS
                              + ' Номер: ' + formData.number;
        subDeptEmpl.subDepartment = formData.subDepartment;
      });
    });

    setTimeout(()=> {
      this.days.length = 4;
      this.sEmpCrForm.get('day').setValue('03');
      return;
    }, 10000);

  }

  getCrSDEFocusedElementName(){
    setTimeout(()=>{
      let elements = [].slice.call((this.elementRef.nativeElement)
        .querySelectorAll('[formControlName]'));
      elements.forEach( element =>{
        element.addEventListener('focus', () => {
          this.inputName = element.id;
        });
        element.addEventListener('blur', () => {
          this.inputName = '';
        })
      });
    }, 50);
  }

  addSubDeptEmployee(){
    this.submitted = true;
    if(this.sEmpCrForm.valid) {
      this.subDeptEmployeeService.addSubDeptEmployee(this.subDeptEmployee)
        .subscribe(() => this.goToAllSubEmployees());
    }
  }

  goToAllSubEmployees(){
    this.router.navigate(['/sub-dept_employees']);
  }
}
