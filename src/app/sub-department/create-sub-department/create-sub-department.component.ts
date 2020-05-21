import { Component, ElementRef, OnInit } from '@angular/core';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-sub-department',
  templateUrl: './create-sub-department.component.html',
  styleUrls: ['./create-sub-department.component.css']
})

export class CreateSubDepartmentComponent implements OnInit{

  subDepartment: SubDepartment;
  mainDepartments: MainDepartment[];
  sDeptCrForm: FormGroup;
  submitted: boolean = false;
  inputName: string = '';

  constructor(private subDepartmentService: SubDepartmentService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder, private router: Router,
              private elementRef: ElementRef) {
    this.subDepartment = new SubDepartment();
  }

  ngOnInit() {
    this.selectMainDepartment();
    this.createSubDeptForm();
    this.getSubDeptFormValue();
    this.getCrSDFocusedElementName();
  }

  createSubDeptForm(){
    this.sDeptCrForm = this.formBuilder.group({
      name: [null, [Validators.required,
                    Validators.pattern("^(([А-яЁё]+\\s?)+|([A-z]+\\s?)+)$"),
                    Validators.minLength(5),
                    Validators.maxLength(100)]],
      mainDepartment: [null,[Validators.required]]
    });
  }

  selectMainDepartment(){
    this.mainDepartmentService.getAllMainDepartments()
        .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
  }

  getSubDeptFormValue(){
    this.sDeptCrForm.valueChanges.subscribe(formData =>{
      setTimeout(() => {
        let subDept = this.subDepartment;
        subDept.name = formData.name;
        subDept.mainDepartment = formData.mainDepartment;
      });
    });
  }

  getCrSDFocusedElementName() {
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

  addSubDepartment(){
    this.submitted = true;
    if (this.sDeptCrForm.valid) {
      this.subDepartmentService.addSubDepartment(this.subDepartment)
        .subscribe(result => this.goToAllSubDepartments());
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
  }
}
