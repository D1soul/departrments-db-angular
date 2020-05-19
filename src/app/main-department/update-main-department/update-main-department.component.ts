import {Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-main-department',
  templateUrl: './update-main-department.component.html',
  styleUrls: ['./update-main-department.component.css']
})

export class UpdateMainDepartmentComponent implements OnInit {

  nameRoute: string;
  mainDepartment: MainDepartment;
  mDeptUpdForm: FormGroup;
  inputName: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.createMainDeptForm();
    this.getMainDepartmentDetail();
    this.getUpdMDFocusedElementName();
    this.mainDeptFormValue(this.mainDepartment);
  }

  createMainDeptForm(){
    this.mDeptUpdForm = this.formBuilder.group({
      name: [null, [Validators.required,
        Validators.pattern("^(([А-я]+\\s?)+|([A-z]+\\s?)+)$"),
        Validators.minLength(7),
        Validators.maxLength(60)]]
    });
  }

  getMainDepartmentDetail() {
    this.nameRoute = this.route.snapshot.params['name'];
    this.mainDepartmentService.getMainDepartmentDetail(this.nameRoute)
      .subscribe(mainDepartment => {
        this.mainDepartment = mainDepartment;
        this.initMainDeptForm(mainDepartment);
    });
  }

  initMainDeptForm(mainDepartment){
    this.mDeptUpdForm.setValue({
      name: mainDepartment.name
    })
  }

  get nameControl(){
    return this.mDeptUpdForm.get('name');
  }

  mainDeptFormValue(mainDepartment){
    this.mDeptUpdForm.valueChanges.subscribe(formData =>{
      mainDepartment.name = formData.name;
    });
  }

  getUpdMDFocusedElementName(){
    let elements = [].slice.call((this.elementRef.nativeElement)
      .querySelectorAll('[formControlName]'));
    elements.forEach( element =>{
      element.addEventListener('focus', () => {
        this.inputName = element.id;
      });
      element.addEventListener('blur', () => {
     //   this.inputName = '';
      })
    });
  }

  updateMainDepartment(){
    if (this.mDeptUpdForm.valid) {
      this.mainDepartmentService.updateMainDepartment(this.nameRoute, this.mainDepartment)
        .subscribe(() => this.goToAllMainDepartments());
    }
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']).then(r =>r );
  }
}
