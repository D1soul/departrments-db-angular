import {Component, ElementRef, OnInit} from '@angular/core';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-main-department',
  templateUrl: './create-main-department.component.html',
  styleUrls: ['./create-main-department.component.css']
})
export class CreateMainDepartmentComponent implements OnInit{

  mainDepartment: MainDepartment;
  mDeptCrForm: FormGroup;
  submitted: boolean = false;
  inputName: string = '';

  constructor(private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder, private router: Router,
              private elementRef: ElementRef) {
    this.mainDepartment = new MainDepartment();
  }

  ngOnInit() {
    this.createMainDeptForm();
    this.getMainDeptFormValue(this.mainDepartment);
    this.getCrMDFocusedElementName();
  }

  createMainDeptForm(){
    this.mDeptCrForm = this.formBuilder.group({
      name: [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\s?)+|([A-z]+\\s?)+)$"),
        Validators.minLength(7),
        Validators.maxLength(60)]]
    });
  }

  getMainDeptFormValue(mainDepartment){
    this.mDeptCrForm.valueChanges.subscribe(formData =>{
      mainDepartment.name = formData.name;
    });
  }

  getCrMDFocusedElementName() {
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

  addMainDepartment(){
    this.submitted = true;
    if (this.mDeptCrForm.valid) {
      this.mainDepartmentService.addMainDepartment(this.mainDepartment)
        .subscribe(() => this.goToAllMainDepartments());
    }
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']);
  }
}
