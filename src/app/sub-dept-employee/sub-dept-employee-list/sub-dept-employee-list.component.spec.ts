import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDeptEmployeeListComponent } from './sub-dept-employee-list.component';

describe('SubEmployeeListComponent', () => {
  let component: SubDeptEmployeeListComponent;
  let fixture: ComponentFixture<SubDeptEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDeptEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDeptEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
