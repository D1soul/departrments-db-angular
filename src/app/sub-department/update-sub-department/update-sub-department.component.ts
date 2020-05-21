import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubDepartment } from '../../entities/sub-department';
import { SubDepartmentService } from '../../service/sub-department.service';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-sub-department',
  templateUrl: './update-sub-department.component.html',
  styleUrls: ['./update-sub-department.component.css']
})
export class UpdateSubDepartmentComponent implements OnInit {

  name: string;
  subDepartment: SubDepartment;
  mainDepartments: MainDepartment[];
  sDeptUpdForm: FormGroup;
  inputName: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private subDepartmentService: SubDepartmentService,
              private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.getSubDepartmentDetail();
    this.createSubDeptForm();
    this.getSubDeptFormValue();
    this.getUpdSDFocusedElementName();
  }

  getSubDepartmentDetail() {
    this.name = this.route.snapshot.params['name'];
    this.mainDepartmentService.getAllMainDepartments()
      .subscribe(mainDepartments => this.mainDepartments = mainDepartments);
    this.subDepartmentService.getSubDepartmentDetail(this.name)
      .subscribe(subDepartment => {this.subDepartment = subDepartment;
        this.initSubDeptForm(subDepartment);
    });
  }

  createSubDeptForm(){
    this.sDeptUpdForm = this.formBuilder.group({
      name: [null, [Validators.required,
                    Validators.pattern("^(([А-яЁё]+\\s?)+|([A-z]+\\s?)+)$"),
                    Validators.minLength(5),
                    Validators.maxLength(100)]],
      mainDepartment: [null,[Validators.required]]
    });
  }

  initSubDeptForm(subDepartment: SubDepartment){
    this.sDeptUpdForm.setValue({
      name: subDepartment.name,
      mainDepartment: subDepartment.mainDepartment
    })
  }

  getSubDeptFormValue(){
    this.sDeptUpdForm.valueChanges.subscribe(formData =>{
      setTimeout(() => {
        let subDept = this.subDepartment;
        subDept.name = formData.name;
        subDept.mainDepartment = formData.mainDepartment;
      });
    });
  }

  getUpdSDFocusedElementName() {
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

  updateSubDepartment(){
    if (this.sDeptUpdForm.valid){
    this.subDepartmentService.updateSubDepartment(this.name, this.subDepartment)
      .subscribe(() =>  this.goToAllSubDepartments());
    }
  }

  goToAllSubDepartments(){
    this.router.navigate(['/sub-departments']);
  }
}
