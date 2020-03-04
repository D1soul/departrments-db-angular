import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubDeptEmployeeComponent } from './create-sub-dept-employee.component';

describe('CreateSubEmployeeComponent', () => {
  let component: CreateSubDeptEmployeeComponent;
  let fixture: ComponentFixture<CreateSubDeptEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubDeptEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubDeptEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
