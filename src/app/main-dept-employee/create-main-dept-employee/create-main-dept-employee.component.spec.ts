import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainDeptEmployeeComponent } from './create-main-dept-employee.component';

describe('CreateMainEmployeeComponent', () => {
  let component: CreateMainDeptEmployeeComponent;
  let fixture: ComponentFixture<CreateMainDeptEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMainDeptEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainDeptEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
