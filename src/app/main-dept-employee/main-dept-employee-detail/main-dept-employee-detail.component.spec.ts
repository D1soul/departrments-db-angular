import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDeptEmployeeDetailComponent } from './main-dept-employee-detail.component';

describe('MainDeptEmployeeByFullNameComponent', () => {
  let component: MainDeptEmployeeDetailComponent;
  let fixture: ComponentFixture<MainDeptEmployeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDeptEmployeeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDeptEmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
