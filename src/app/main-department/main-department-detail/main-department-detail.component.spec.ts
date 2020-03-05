import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDepartmentDetailComponent } from './main-department-detail.component';

describe('MainDepartmentDetailByNameComponent', () => {
  let component: MainDepartmentDetailComponent;
  let fixture: ComponentFixture<MainDepartmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDepartmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDepartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
