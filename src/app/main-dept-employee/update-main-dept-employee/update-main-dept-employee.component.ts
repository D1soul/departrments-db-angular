import { Component, ElementRef, OnInit } from '@angular/core';
import { MainDeptEmployee } from '../../entities/main-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDeptEmployeeService } from '../../service/main-dept-employee.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitDateFunction } from '../../service/init-date.function';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-update-main-dept-employee',
  templateUrl: './update-main-dept-employee.component.html',
  styleUrls: ['./update-main-dept-employee.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class UpdateMainDeptEmployeeComponent implements OnInit {

  lastNameRoute: string;
  firstNameRoute: string;
  middleNameRoute: string;
  days = [];
  months = [];
  years = [];
  mainDeptEmployee: MainDeptEmployee;
  mainDepartments: MainDepartment[];
  mEmpUpdForm: FormGroup;
  inputName: string = '';
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDeptEmployeeService: MainDeptEmployeeService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit() {
    InitDateFunction(this.days, this.months, this.years);
    this.getMainDeptEmployeeDetail();
    this.createMainDeptEmpForm();
    this.getMainDeptEmpFormValue();
    this.getUpdMDEFocusedElementName();
  }

  getMainDeptEmployeeDetail() {
    this.lastNameRoute = this.route.snapshot.params['lastName'];
    this.firstNameRoute = this.route.snapshot.params['firstName'];
    this.middleNameRoute = this.route.snapshot.params['middleName'];
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments =>
        this.mainDepartments = mainDepartments
      );
    this.mainDeptEmployeeService.getMainDeptEmployeeDetail(
      this.lastNameRoute, this.firstNameRoute, this.middleNameRoute)
      .subscribe(mainDeptEmployee => {
        this.mainDeptEmployee = mainDeptEmployee;
        this.initMainDeptEmpForm(mainDeptEmployee);
      },
     error => this.errorMessage = error);
  }

  createMainDeptEmpForm(){
    this.mEmpUpdForm = this.formBuilder.group({
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

  initMainDeptEmpForm(mainDeptEmployee: MainDeptEmployee){
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

  getMainDeptEmpFormValue(){
    this.mEmpUpdForm.valueChanges.subscribe(formData =>{
      this.errorMessage = null;
      let data = new Date(formData.year, this.months.indexOf(formData.month)+1, 0);
      if(formData.day > data.getDate() ) {
        this.mEmpUpdForm.get('day').setValue(data.getDate());
        return;
      }
      setTimeout(() => {
        let mainDeptEmpl = this.mainDeptEmployee;
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

  getUpdMDEFocusedElementName() {
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


  updateMainDeptEmployee(){
    if (this.mEmpUpdForm.valid) {
      this.mainDeptEmployeeService.updateMainDeptEmployee(
        this.lastNameRoute, this.firstNameRoute, this.middleNameRoute, this.mainDeptEmployee)
        .subscribe(() => this.goToAllMainDeptEmployees(), error => {
          this.errorMessage = error;
          this.mEmpUpdForm.setErrors({'error': true});
        });
    }
  }

  goToAllMainDeptEmployees(){
    this.router.navigate(['/main_dept_employees']).then();
  }
}
