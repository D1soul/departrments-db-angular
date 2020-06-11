import { Component, ElementRef, OnInit } from '@angular/core';
import { SubDeptEmployee } from '../../entities/sub-dept-employee';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDeptEmployeeService } from '../../service/sub-dept-employee.service';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitDateFunction } from '../../service/init-date.function';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-update-sub-dept-employee',
  templateUrl: './update-sub-dept-employee.component.html',
  styleUrls: ['./update-sub-dept-employee.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class UpdateSubDeptEmployeeComponent implements OnInit {

  lastNameRoute: string;
  firstNameRoute: string;
  middleNameRoute: string;
  days = [];
  months = [];
  years = [];
  subDeptEmployee: SubDeptEmployee;
  subDepartments: SubDepartment[];
  sEmpUpdForm: FormGroup;
  inputName: string = '';
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private subDeptEmployeeService: SubDeptEmployeeService,
              private subDepartmentService: SubDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit() {
    InitDateFunction(this.days, this.months, this.years);
    this.getSubDeptEmployeeDetail();
    this.createSubDeptEmpForm();
    this.getSubDeptEmpFormValue();
    this.getUpdSDEFocusedElementName();
  }

  getSubDeptEmployeeDetail() {
    this.lastNameRoute = this.route.snapshot.params['lastName'];
    this.firstNameRoute = this.route.snapshot.params['firstName'];
    this.middleNameRoute = this.route.snapshot.params['middleName'];
    this.subDepartmentService.getAllSubDepartments()
      .subscribe(subDepartments =>
        this.subDepartments = subDepartments
      );
    this.subDeptEmployeeService.getSubDeptEmployeeDetail(
      this.lastNameRoute, this.firstNameRoute, this.middleNameRoute)
      .subscribe(subDeptEmployee => {
          this.subDeptEmployee = subDeptEmployee;
          this.initSubDeptEmpForm(subDeptEmployee);
        },
        error => this.errorMessage = error);
  }

  createSubDeptEmpForm(){
    this.sEmpUpdForm = this.formBuilder.group({
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
      subDepartment: [null, [Validators.required]]
    });
  }

  initSubDeptEmpForm(subDeptEmployee: SubDeptEmployee){
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

  getSubDeptEmpFormValue(){
    this.sEmpUpdForm.valueChanges.subscribe(formData =>{
      this.errorMessage = null;
      let data = new Date(formData.year, this.months.indexOf(formData.month)+1, 0);
      if(formData.day > data.getDate() ) {
        this.sEmpUpdForm.get('day').setValue(data.getDate());
        return;
      }
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
  }

  getUpdSDEFocusedElementName() {
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


  updateSubDeptEmployee(){
    if (this.sEmpUpdForm.valid) {
      this.subDeptEmployeeService.updateSubDeptEmployee(
        this.lastNameRoute, this.firstNameRoute, this.middleNameRoute, this.subDeptEmployee)
        .subscribe(() => this.goToAllSubDeptEmployees(), error => {
          this.errorMessage = error;
          this.sEmpUpdForm.setErrors({'error': true});
        });
    }
  }

  goToAllSubDeptEmployees(){
    this.router.navigate(['/sub-dept_employees']).then();
  }
}

