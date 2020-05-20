import { Component, ElementRef, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { Router} from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitBirthDate } from '../../service/init.birth.date';

@Component({
  selector: 'app-create-main-dept-employee',
  templateUrl: './create-main-dept-employee.component.html',
  styleUrls: ['./create-main-dept-employee.component.css']
})
export class CreateMainDeptEmployeeComponent implements OnInit{

  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];
  mEmpCrForm: FormGroup;
  days = [];
  months = [];
  years = [];
  submitted: boolean = false;
  inputName: string = '';

  constructor(private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService,
              private router: Router, private formBuilder: FormBuilder,
              private elementRef: ElementRef) {
    this.mainDeptEmployee = new MainDeptEmployee();
  }

  ngOnInit() {
    this.createMainDeptEmplForm();
    InitBirthDate(this.days, this.months, this.years);
    this.selectMainDepartment();
    this.getMainDeptEmplFormValue(this.mainDeptEmployee);
    this.getCrMDEFocusedElementName();
  }

  selectMainDepartment(){
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  createMainDeptEmplForm(){
    this.mEmpCrForm = this.formBuilder.group({
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

  getMainDeptEmplFormValue(mainDeptEmployee){
    this.mEmpCrForm.valueChanges.subscribe(formData =>{
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

  getCrMDEFocusedElementName() {
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

  addMainDeptEmployee(){
    this.submitted = true;
    if (this.mEmpCrForm.valid) {
      console.log(this.mainDeptEmployee.birthDate);
      this.mainDeptEmployeeService.addMainDeptEmployee(this.mainDeptEmployee)
        .subscribe(result => this.goToAllMainEmployees());
    }
  }

  goToAllMainEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
