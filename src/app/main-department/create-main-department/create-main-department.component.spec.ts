import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainDepartmentComponent } from './create-main-department.component';

describe('CreateMainDepartmentComponent', () => {
  let component: CreateMainDepartmentComponent;
  let fixture: ComponentFixture<CreateMainDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMainDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
