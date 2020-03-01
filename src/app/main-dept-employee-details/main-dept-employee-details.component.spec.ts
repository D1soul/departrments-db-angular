import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDeptEmployeeDetailsComponent } from './main-dept-employee-details.component';

describe('MainEmployeeDetailsComponent', () => {
  let component: MainDeptEmployeeDetailsComponent;
  let fixture: ComponentFixture<MainDeptEmployeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDeptEmployeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDeptEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
