import { Component, ElementRef, OnInit } from '@angular/core';
import { MainDepartment } from '../../entities/main-department';
import { MainDepartmentService } from '../../service/main-department.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInAndOutTopAnimation } from '../../animation/fade-in-and-out-top-animation';

@Component({
  selector: 'app-create-main-department',
  templateUrl: './create-main-department.component.html',
  styleUrls: ['./create-main-department.component.css'],
  animations: [fadeInAndOutTopAnimation],
  host: { '[@fadeInAndOutTopAnimation]': '' }
})
export class CreateMainDepartmentComponent implements OnInit{

  mainDepartment: MainDepartment;
  mDeptCrForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  inputName: string = '';

  constructor(private mainDepartmentService: MainDepartmentService,
              private formBuilder: FormBuilder, private router: Router,
              private elementRef: ElementRef) {
    this.mainDepartment = new MainDepartment();
  }

  ngOnInit() {
    this.createMainDeptForm();
    this.getMainDeptFormValue();
    this.getCrMDFocusedElementName();
  }

  createMainDeptForm(){
    this.mDeptCrForm = this.formBuilder.group({
      name: [null, [Validators.required,
                    Validators.pattern("^(([А-яЁё]\\s?)+|([A-z]\\s?)+)$"),
                    Validators.minLength(7)]]
    });
  }

  getMainDeptFormValue(){
    this.mDeptCrForm.valueChanges.subscribe(formData => {
      this.errorMessage = null;
      setTimeout(() => {
        this.mainDepartment.name = formData.name;
      });
    });
  }

  getCrMDFocusedElementName() {
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

  addMainDepartment(){
    this.submitted = true;
    if (this.mDeptCrForm.valid) {
      this.mainDepartmentService.addMainDepartment(this.mainDepartment)
        .subscribe(() => this.goToAllMainDepartments(), error => {
          this.errorMessage = error;
          this.mDeptCrForm.setErrors({'error': true});
        });
    }
  }

  goToAllMainDepartments(){
    this.router.navigate(['/main_departments']).then();
  }
}
