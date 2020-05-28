import { Component, ElementRef, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { Router} from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitDateFunction } from '../../service/init-date.function';

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
  errorMessage: string;

  constructor(private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService,
              private router: Router, private formBuilder: FormBuilder,
              private elementRef: ElementRef) {
    this.mainDeptEmployee = new MainDeptEmployee();
  }

  ngOnInit() {
    this.createMainDeptEmplForm();
    InitDateFunction(this.days, this.months, this.years);
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
                        Validators.pattern("^([А-яЁё]+|[A-z]+)$")]],
      firstName: [null, [Validators.required,
                         Validators.pattern("^([А-яЁё]+|[A-z]+)$")]],
      middleName: [null, [Validators.required,
                          Validators.pattern("^(([А-яЁё]+|[A-z]+)|(-))$") ]],
      day: [null, [Validators.required]],
      month: [null, [Validators.required]],
      year: [null, [Validators.required]],
      seriesF:[null, [Validators.required,
                      Validators.pattern("\\d+"),
                      Validators.minLength(2)]],
      seriesS:[null, [Validators.required,
                      Validators.pattern("\\d+"),
                      Validators.minLength(2)]],
      number:[null, [Validators.required,
                     Validators.pattern("\\d+"),
                     Validators.minLength(6)]],
      mainDepartment: [null, [Validators.required]]
    });
  }

  getMainDeptEmplFormValue(mainDeptEmpl: MainDeptEmployee){
    this.mEmpCrForm.valueChanges.subscribe(formData =>{
      let data = new Date(formData.year, this.months.indexOf(formData.month)+1, 0);
      if(formData.day > data.getDate() ) {
        this.mEmpCrForm.get('day').setValue(data.getDate());
        return;
      }
      setTimeout(()=> {
        mainDeptEmpl.lastName = formData.lastName;
        mainDeptEmpl.firstName = formData.firstName;
        mainDeptEmpl.middleName = formData.middleName;
        mainDeptEmpl.birthDate = formData.day + '/'
                               + formData.month + '/'
                               + formData.year;
        mainDeptEmpl.passport = 'Серия: ' + formData.seriesF
                              + ' ' + formData.seriesS
                              + ' Номер: ' + formData.number;
        mainDeptEmpl.mainDepartment = formData.mainDepartment;
      });
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
      this.mainDeptEmployeeService.addMainDeptEmployee(this.mainDeptEmployee)
        .subscribe(() => this.goToAllMainEmployees(),
          error => {
            this.errorMessage = error;
            this.mEmpCrForm.get('lastName').setErrors( {'mainDeptEmplAlreadyExist': true});
        });
    }
  }

  goToAllMainEmployees(){
    this.router.navigate(['/main_dept_employees']);
  }
}
