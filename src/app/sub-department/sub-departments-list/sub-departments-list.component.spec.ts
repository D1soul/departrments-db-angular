import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentsListComponent } from './sub-departments-list.component';

describe('SubDepartmentsListComponent', () => {
  let component: SubDepartmentsListComponent;
  let fixture: ComponentFixture<SubDepartmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
