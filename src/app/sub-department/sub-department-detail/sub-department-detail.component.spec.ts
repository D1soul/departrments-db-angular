import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentDetailComponent } from './sub-department-detail.component';

describe('SubDepartmentDetailByNameeComponent', () => {
  let component: SubDepartmentDetailComponent;
  let fixture: ComponentFixture<SubDepartmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
