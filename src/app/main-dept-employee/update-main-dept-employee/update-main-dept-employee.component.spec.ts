import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMainDeptEmployeeComponent } from './update-main-dept-employee.component';

describe('UpdateMainDeptEmployeeByFullNameComponent', () => {
  let component: UpdateMainDeptEmployeeComponent;
  let fixture: ComponentFixture<UpdateMainDeptEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMainDeptEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMainDeptEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
