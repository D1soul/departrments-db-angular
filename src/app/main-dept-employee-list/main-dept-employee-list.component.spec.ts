import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDeptEmployeeListComponent } from './main-dept-employee-list.component';

describe('MainEmployeeListComponent', () => {
  let component: MainDeptEmployeeListComponent;
  let fixture: ComponentFixture<MainDeptEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDeptEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDeptEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
