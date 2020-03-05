import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDeptEmployeeDetailComponent } from './sub-dept-employee-detail.component';

describe('SubDeptEmployeeDetailByFullNameComponent', () => {
  let component: SubDeptEmployeeDetailComponent;
  let fixture: ComponentFixture<SubDeptEmployeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDeptEmployeeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDeptEmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
