import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDeptEmployeeDetailsComponent } from './sub-dept-employee-details.component';

describe('SubEmployeeDetailsComponent', () => {
  let component: SubDeptEmployeeDetailsComponent;
  let fixture: ComponentFixture<SubDeptEmployeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDeptEmployeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDeptEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
