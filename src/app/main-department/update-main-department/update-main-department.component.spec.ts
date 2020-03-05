import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMainDepartmentComponent } from './update-main-department.component';

describe('UpdateMainDepartmentByNameComponent', () => {
  let component: UpdateMainDepartmentComponent;
  let fixture: ComponentFixture<UpdateMainDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMainDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMainDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
