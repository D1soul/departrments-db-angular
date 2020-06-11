import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-update-main-department',
  templateUrl: './update-main-department.component.html',
  styleUrls: ['./update-main-department.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})

export class UpdateMainDepartmentComponent implements OnInit {

  nameRoute: string;
  mainDepartment: MainDepartment;
  mDeptUpdForm: FormGroup;
  errorMessage: string;
  inputName: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.createMainDeptForm();
    this.getMainDepartmentDetail();
    this.mainDeptFormValue();
    this.getUpdMDFocusedElementName();
  }

  createMainDeptForm(){
    this.mDeptUpdForm = this.formBuilder.group({
      name: [null, [Validators.required,
        Validators.pattern("^(([А-яЁё]\\s?)+|([A-z]\\s?)+)$"),
        Validators.minLength(7)]]
    });
  }

  getMainDepartmentDetail() {
    this.nameRoute = this.route.snapshot.params['name'];
    this.mainDepartmentService.getMainDepartmentDetail(this.nameRoute)
      .subscribe(mainDepartment => {
        this.mainDepartment = mainDepartment;
        this.initMainDeptForm(mainDepartment);
    }, error => {
        this.errorMessage = error;
      });
  }

  initMainDeptForm(mainDepartment){
    this.mDeptUpdForm.setValue({
      name: mainDepartment.name
    })
  }

  mainDeptFormValue(){
    this.mDeptUpdForm.valueChanges.subscribe(formData => {
    this.errorMessage = null;
    setTimeout(() => {
        let mainDept = this.mainDepartment;
        mainDept.name = formData.name;
      });
    });
  }

  getUpdMDFocusedElementName(){
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

  updateMainDepartment(){
    if (this.mDeptUpdForm.valid) {
      this.mainDepartmentService.updateMainDepartment(this.nameRoute, this.mainDepartment)
        .subscribe(() => this.goToAllMainDepartments(), error => {
          this.errorMessage = error;
          this.mDeptUpdForm.setErrors({'error': true});
        });
    }
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']).then();
  }
}
