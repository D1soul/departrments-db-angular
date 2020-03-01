import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubDeptEmployeeComponent } from './update-sub-dept-employee.component';

describe('UpdateSubEmployeeComponent', () => {
  let component: UpdateSubDeptEmployeeComponent;
  let fixture: ComponentFixture<UpdateSubDeptEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSubDeptEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubDeptEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
